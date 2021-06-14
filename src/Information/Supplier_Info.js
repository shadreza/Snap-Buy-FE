import React from "react";
import axios from "axios";
import M from "materialize-css";
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
    <>
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
        {getSearchData.map((item) => {
          return (
            <div>
              <h2>{item.SUPPLIER_ID}</h2>
              <h2>{item.SUPPLIER_NAME}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Supplier_Info;
