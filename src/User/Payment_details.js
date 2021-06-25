import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useStateValue } from "../StateProvider";
import { presentBasket, basket } from "../App";
import { useHistory } from "react-router-dom";

const Payment_details = ({ checkout }) => {
  const [userDetails, setUserDetails] = useState([]);
  const history = useHistory();
  const [allCustomer, setAllCustomer] = useState([]);
  const [{ auth, user }, dispatch] = useStateValue();
  const [getID, setGetID] = useState("");

  const BASKET = useContext(presentBasket);
  const basketContext = useContext(basket);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/customer/${user}`)
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      });
    console.log("Props :", checkout);
    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setAllCustomer(response.data);
      console.log(response.data);
    });
    console.log("basket ", BASKET[0]);
    console.log("User is undefined or not ", user);
  }, []);

  const [error, setError] = useState(0);
  const handleSubmit = () => {
    console.log("This has to be done ", checkout);
    toast.dismiss();
    let card_type = document
      .getElementById("card_type")
      .value.trim()
      .toLowerCase();
    let card_number = document
      .getElementById("card_number")
      .value.trim()
      .toLowerCase();
    let card_month = document
      .getElementById("card_month")
      .value.trim()
      .toLowerCase();
    let card_year = document
      .getElementById("card_year")
      .value.trim()
      .toLowerCase();
    let cvc = document.getElementById("cvc").value.trim().toLowerCase();

    if (
      card_type.length === 0 &&
      card_number.length === 0 &&
      cvc.length === 0 &&
      card_year.length === 0 &&
      card_month.length === 0
    ) {
      setError(100);
      toast.error("Please fill up billing information ", {
        position: "top-center",
      });
    } else if (
      card_type.length === 0
      //   card_number.length === 0 &&
      //   card_type.length === 0 &&
      //   card_number.length === 0
    ) {
      setError(1);
      toast.error("Please select card type ", { position: "top-center" });
    } else if (card_number.length === 0) {
      setError(2);
      toast.error("Please fill up card number ", { position: "top-center" });
    } else if (cvc.length === 0) {
      setError(5);
      toast.error("Please fill  up cvc ", { position: "top-center" });
    } else if (card_month.length === 0) {
      setError(3);
      toast.error("Please select card month ", { position: "top-center" });
    } else if (card_year.length === 0) {
      setError(4);
      toast.error("Please fill up card year ", { position: "top-center" });
    } else if (parseInt(card_year) < 2021) {
      setError(4);
      toast.error("Your card is expired ", { position: "top-center" });
    } else if (parseInt(card_year) === 2021 && parseInt(card_month) < 6) {
      setError(3);
      toast.error("Your card is expired ", { position: "top-center" });
    } else {
      let count = 0;
      let price = 0;
      for (let i = 0; i < BASKET[0].length; i++) {
        count += BASKET[0][i].qty;
        price += BASKET[0][i].price;
      }
      axios.post("http://localhost:3001/api/insert/order_info", {
        total_cost: price,
        quantity: count,
      });
      let user_id;
      allCustomer.map((item) => {
        if (item.CUST_MAIL === user) {
          user_id = item.CUST_ID;
        }
      });
      console.log(BASKET[0]);
      axios.post("http://localhost:3001/api/insert/order_info", {
        total_cost: price,
        quantity: count,
      });
      axios.get("http://localhost:3001/api/get/order_id").then((response) => {
        setGetID(response.data[0]);
      });
      axios.get(`http://localhost:3001/api/get/customer`).then((response) => {
        setAllCustomer(response.data);
      });
      let cust_id;
      allCustomer.map((item) => {
        if (item.CUST_MAIL === user) {
          cust_id = item.CUST_ID;
        }
      });
      axios.get("http://localhost:3001/api/get/product").then((response) => {
        setAllProduct(response.data);
      });
      let t_price;
      let qty;
      for (let i = 0; i < BASKET[0].length; i++) {
        t_price += BASKET[0][i].price;
        qty += BASKET[0][i].qty;
      }

      for (let i = 0; i < BASKET[0].length; i++) {
        axios.post("http://localhost:3001/api/insert/order_info", {
          total_cost: t_price,
          quantity: qty,
          id:userDetails.CUST_ID,
        });
        axios.post("http://localhost:3001/api/insert/buy_cart", {
          order_id: getID.ORDER_ID,
          product_id: BASKET[0][i].id,
          cust_id: cust_id,
          price: BASKET[0][i].price,
          product_selected_quantity: BASKET[0][i].qty,
        });
        console.log(BASKET[0][i].id, " ", getID.ORDER_ID);
        let get_qty;
        allProduct.map((item) => {
          if (item.PRODUCT_ID === BASKET[0][i].id) {
            get_qty = item.PRODUCT_QUANTITY;
          }
        });
        console.log(get_qty);
        console.log(BASKET[0][i].qty);
        axios.post("http://localhost:3001/api/update/product", {
          id: BASKET[0][i].id,
          qty: get_qty - BASKET[0][i].qty,

        });
      }
      toast.success("You order has been successfully placed ", {
        position: "top-center",
      });
      alert("Your order has been successfully placed");
      // BASKET[1]([]);
      // basketContext[1]([]);
      history.push("/");
    }
  };

  return (
    <>
      <div className="employee">
        {allCustomer.length ? (
          <h2
            style={{
              marginTop: "40px",
              marginRight: "auto",
              fontSize: "15px",
              paddingLeft: "10px",
              marginBottom: "15px",
            }}
          >
            Shipping Information
          </h2>
        ) : (
          ""
        )}
        <hr style={{ marginLeft: "20px" }} />
        {allCustomer.map((item) => {
          if (item.CUST_MAIL === user) {
            return (
              <>
                <div
                  className="ui form"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "40px",
                    paddingLeft: "30px",
                  }}
                >
                  <div className="field">
                    <label>Name*</label>
                    <input
                      placeholder="Read Only"
                      readonly=""
                      type="text"
                      value={item.CUST_NAME}
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>
                  <div className="field">
                    <label>Phone*</label>
                    <input
                      placeholder="Read Only"
                      readonly=""
                      type="text"
                      value={item.CUST_PHONE}
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>
                  <div className="field">
                    <label>Mail*</label>
                    <input
                      placeholder="Read Only"
                      readonly=""
                      type="text"
                      value={item.CUST_MAIL}
                      style={{ textTransform: "lowercase" }}
                    />
                  </div>
                  <div className="fields">
                    <div
                      className="four wide field"
                      style={{ minWidth: "250px" }}
                    >
                      <label>House No*</label>
                      <input
                        placeholder="Read Only"
                        readonly=""
                        type="text"
                        value={item.CUST_ADDRESS.HOUSE_NO}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div
                      className="four wide field"
                      style={{ minWidth: "250px" }}
                    >
                      <label>Street No*</label>
                      <input
                        placeholder="Read Only"
                        readonly=""
                        type="text"
                        value={item.CUST_ADDRESS.STREET_NO}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div
                      className="four wide field"
                      style={{ minWidth: "250px" }}
                    >
                      <label>Postal Code*</label>
                      <input
                        placeholder="Read Only"
                        readonly=""
                        type="text"
                        value={item.CUST_ADDRESS.POSTAL_CODE}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
        <h2
          style={{
            marginTop: "40px",
            marginRight: "auto",
            fontSize: "15px",
            paddingLeft: "10px",
            marginBottom: "15px",
          }}
        >
          Billing Information
        </h2>
        <hr style={{ marginLeft: "20px" }} />

        <div
          className="ui form"
          style={{
            paddingTop: "10px",
            paddingBottom: "40px",
            paddingLeft: "30px",
          }}
        >
          <div className="field">
            <label>Card Type</label>
            <div
              className={
                error === 1 || error === 100
                  ? "four wide field error"
                  : "four wide field"
              }
            >
              <select
                className="ui fluid search dropdown"
                name="card[type]"
                id="card_type"
              >
                <option value="">---</option>
                <option value="visa">Visa</option>
                <option value="master_card">Master Card</option>
                <option value="american_express">American Express</option>
              </select>
            </div>
          </div>
          <div className="fields">
            <div
              className={
                error === 2 || error === 100
                  ? "seven wide field error"
                  : "seven wide field"
              }
            >
              <label>Card Number</label>
              <input
                type="text"
                name="card[number]"
                maxlength="16"
                placeholder="Card #"
                id="card_number"
              />
            </div>
            <div
              className={
                error === 5 || error === 100
                  ? "three wide field error"
                  : "three wide field"
              }
            >
              <label>CVC</label>
              <input
                type="text"
                name="card[cvc]"
                maxlength="3"
                placeholder="CVC"
                id="cvc"
              />
            </div>
            <div className="six wide field">
              <label>Expiration</label>
              <div className="two fields">
                <div
                  className={
                    error === 3 || error === 100 ? "field error" : "field"
                  }
                >
                  <select
                    className="ui fluid search dropdown"
                    name="card[expire-month]"
                    id="card_month"
                  >
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div
                  className={
                    error === 4 || error === 100 ? "field error" : "field"
                  }
                >
                  <input
                    type="text"
                    name="card[expire-year]"
                    maxlength="4"
                    placeholder="Year"
                    id="card_year"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ui button" onClick={handleSubmit} tabindex="0">
            Submit Order
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1400} />
    </>
  );
};

export default Payment_details;
