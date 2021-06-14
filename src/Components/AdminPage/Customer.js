import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { ImSearch } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast} from "react-toastify";
import "./Customer.css";
import axios from "axios";
import Admin_Sidebar from "./Admin_Sidebar.js";

const Customer = () => {
  const [getSearchData, setGetSearchData] = useState([]);
  const handleSubmit = () => {
    let customer_value = document
      .getElementById("customer_value")
      .value.trim()
      .toLowerCase();

    if (customer_value.length === 0) {
      toast.error( "Search Something", {position: "top-center"} );
    } else {
      console.log("what i am basically searching is ", customer_value);
      axios
        .get(`http://localhost:3001/api/get/search_customer/${customer_value}`)
        .then((response) => {
          setGetSearchData(response.data);
        });
    }
  };
  return (
    <div>
      <Admin_Sidebar />
      <div className="customer__info">
        <h3>Customer Information</h3>
        <div className="customer__input">
          <input type="text" id="customer_value" />
          <ImSearch className="icon" onClick={handleSubmit} />
        </div>
        <div
          style={{
            display: "flex",
            margin: "10px",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {getSearchData &&
            getSearchData.map((item) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Body className="cards">
                    <Card.Title
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        marginTop: "20px",
                      }}
                    >
                      {item.CUST_ID + ". " + item.CUST_NAME}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p>
                        <span style={{ fontWeight: "600" }}> Mail ID </span>
                        {" :  " + item.CUST_MAIL}
                      </p>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p>
                        <span style={{ fontWeight: "600" }}> Phone No. </span>
                        {" :  " + item.CUST_PHONE}
                      </p>
                    </Card.Subtitle>

                    <Card.Text>
                      <p>
                        <span style={{ fontWeight: "600" }}> Address </span>
                        {" : " +
                          " " +
                          item.CUST_ADDRESS.HOUSE_NO +
                          " " +
                          item.CUST_ADDRESS.STREET_NO +
                          " " +
                          item.CUST_ADDRESS.POSTAL_CODE}
                      </p>
                    </Card.Text>
                    <br />
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Customer;
