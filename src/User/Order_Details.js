import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../StateProvider";

const Order_Details = () => {
  const [getOrderDetails, setGetOrderDetails] = useState([]);
  const [{ cart, user }, dis] = useStateValue();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/order_details_from_cust_mail/${user}`)
      .then((response) => {
        setGetOrderDetails(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
        <h2>{user}</h2>
      {getOrderDetails.map((item) => {
        return (
          <>
            <h4>{item.ORDER_ID} {" "} {item.PRODUCT_SELECTED_QUANTITY}</h4>
            <h4></h4>
          </>
        );
      })}
    </div>
  );
};

export default Order_Details;
