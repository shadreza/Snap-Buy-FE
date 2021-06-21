import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useStateValue } from "../StateProvider";

const Payment_details = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [{ auth, user }, dispatch] = useStateValue();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/customer/${user}`)
      .then((response) => {
        setUserDetails(response.data);
      });
    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setAllCustomer(response.data);
      console.log(response.data);
    });
    console.log("User is undefined or not ", user);
  }, []);

  const [error, setError] = useState(0);
  const handleSubmit = () => {
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
    } 
  };

  return (
    <>
      <div className="employee">
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
