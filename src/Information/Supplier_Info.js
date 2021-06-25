import React from "react";
import axios from "axios";
import M from "materialize-css";
import { Card, Toast } from "react-bootstrap";
import { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import "./Supplier_Info.css";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";

const Supplier_Info = () => {
  const [getSearchData, setGetSearchData] = useState([]);

  const handleSubmit = () => {
    const selected_option = document
      .getElementById("supplier_options")
      .value.trim()
      .toLowerCase();
    const search = document
      .getElementById("supplier_input")
      .value.trim()
      .toLowerCase();
    console.log("this is the value  : ", selected_option, " ", search);
    if (search.length === 0) {
      M.toast({ html: "Search Field is empty!!!", classes: "red rounded" });
    } else if (selected_option === "name") {
      axios
        .get(`http://localhost:3001/api/get/search_supplier/name/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "mail") {
      axios
        .get(`http://localhost:3001/api/get/search_supplier/mail/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "phone") {
      axios
        .get(`http://localhost:3001/api/get/search_supplier/phone/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "id") {
      axios
        .get(`http://localhost:3001/api/get/search_supplier/id/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    }
  };

  return (
    <div>
      <Admin_Sidebar />
      <div className="supplier_info">
        <Input type="text" placeholder="Search..." id="supplier_input" action>
          <input />
          <select id="supplier_options" name="options">
            <option value="name" selected>
              Name
            </option>
            <option value="id">ID</option>
            <option value="phone">Phone No.</option>
            <option value="mail">Mail</option>
          </select>
          <Button type="submit" onClick={handleSubmit}>
            Search
          </Button>
        </Input>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {getSearchData.map((item) => {
            return (
              <Card
                style={{
                  width: "40rem",
                  boxShadow: "5px 10px 18px #888888",
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
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
                    {item.SUPPLIER_ID + ". " + item.SUPPLIER_NAME}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <p>
                      <span style={{ fontWeight: "600" }}> Mail ID </span>
                      {" :  " + item.SUPPLIER_MAIL}
                    </p>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <p>
                      <span style={{ fontWeight: "600" }}> Phone No. </span>
                      {" :  " + item.SUPPLIER_PHONE}
                    </p>
                  </Card.Subtitle>

                  <Card.Text>
                    <p>
                      <span style={{ fontWeight: "600" }}> Address </span>
                      {" : " +
                        " " +
                        item.SUPPLIER_ADDRESS.HOUSE_NO +
                        " " +
                        item.SUPPLIER_ADDRESS.STREET_NO +
                        " " +
                        item.SUPPLIER_ADDRESS.POSTAL_CODE}
                    </p>
                    <br />
                  </Card.Text>
                </Card.Body>
                <br />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Supplier_Info;
