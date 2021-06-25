import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Card, Toast } from "react-bootstrap";
import { ImSearch } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../../Information/Employee_Info.css";
import axios from "axios";
import Admin_Sidebar from "./Admin_Sidebar.js";

const Customer = () => {
  const [getSearchData, setGetSearchData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setGetSearchData(response.data);
      console.log(getSearchData);
    });
  }, []);
  const handleSubmit = () => {
    let customer_value = document
      .getElementById("customer_value")
      .value.trim()
      .toLowerCase();

    if (customer_value.length === 0) {
      toast("Search Something", { position: "top-center" });
    } else {
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
      <div className="employee_info">
        <h3>Customer Information</h3>
        <div className="employee_info">
          <Input type="text" placeholder="Search..." id="customer_value" action>
            <input />
            <Button type="submit" onClick={handleSubmit}>
              Search
            </Button>
          </Input>
        </div>
        <div
          style={{
            display: "flex",
            margin: "20px",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {getSearchData &&
            getSearchData.map((item) => {
              return (
                <Card
                  style={{
                    width: "40rem",
                    boxShadow: "5px 10px 18px #888888",
                    paddingRight: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
                      <br />
                    </Card.Text>
                  </Card.Body>
                  <br />
                </Card>
              );
            })}
        </div>
        <ToastContainer />
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Customer;
