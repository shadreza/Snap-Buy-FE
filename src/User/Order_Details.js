import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Input, Button, Modal, Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useStateValue } from "../StateProvider";
import "./Order_Details.css";

const Order_Details = () => {
  const [getOrderDetails, setGetOrderDetails] = useState([]);
  const [orderTable, setOrderTable] = useState([]);
  const [{ cart, user }, dis] = useStateValue();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/order_details_from_cust_mail/${user}`)
      .then((response) => {
        setGetOrderDetails(response.data);
        console.log(response.data);
      });
    axios
      .get(`http://localhost:3001/api/get/order_table_from_cust_mail/${user}`)
      .then((response) => {
        setOrderTable(response.data);
        console.log(response.data);
      });
  }, []);

  const [selectedId, setSelectedId] = useState(0);
  const handleModal = (id) => {
    if (id === selectedId) {
      setSelectedId(0);
    } else {
      setSelectedId(id);
    }
    console.log(selectedId);
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px", marginLeft: "30px", padding: "20px" }}>
        {getOrderDetails.map((item) => {
          if (item.ORDER_ID === selectedId) {
            return (
              <>
                <div className="checkout__product">
                  <div className="checkout_items">
                    <div className="checkout__image">
                      <img src={item.PRODUCT_IMAGE} alt="snap buy" />
                    </div>
                    <div className="checkout__product__info">
                      <h4>{item.PRODUCT_NAME}</h4>
                      <p>{item.PRODUCT_SELECTED_QUANTITY}</p>
                      <h4>
                        <small>Tk</small>
                        {item.PRODUCT_PRICE}
                      </h4>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
        {orderTable.map((item) => {
          return (
            <>
              <div
                className=""
                style={{
                  boxShadow: "2px 6px 5px gray",
                  display: "flex",
                }}
                onClick={() => handleModal(item.ORDER_ID)}
              >
                <div
                  className=""
                  style={{
                    margin: "10px",
                    display: "flex",
                  }}
                >
                  <h2>
                    <span>Order Id : {item.ORDER_ID}</span>
                  </h2>
                </div>
                <div>
                  <h4 style={{ display: "flex" }}>
                    <span>Quantity : {item.ORDER_QUANTITY}</span>
                  </h4>
                  <p>{item.ORDER_TIME}</p>
                  <h4 style={{ display: "flex" }}>
                    <small>Tk</small>
                    {item.ORDER_TOTAL_COST}
                  </h4>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Order_Details;
