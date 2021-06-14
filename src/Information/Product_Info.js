import React from "react";
import axios from "axios";
import M from "materialize-css";
import { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import "./Employee_Info.css";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";

const Product_Info = () => {
  const [getSearchData, setGetSearchData] = useState([]);
  const handleSubmit = () => {
    const selected_option = document
      .getElementById("employee_options")
      .value.trim()
      .toLowerCase();
    const search = document
      .getElementById("employee_input")
      .value.trim()
      .toLowerCase();
    console.log("this is the value  : ", selected_option, " ", search);
    if (search.length === 0) {
      M.toast({ html: "Search Field is empty!!!", classes: "red rounded" });
    } else if (selected_option === "name") {
      axios
        .get(`http://localhost:3001/api/get/search_product/name/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "price") {
      axios
        .get(`http://localhost:3001/api/get/search_product/price/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "category") {
      axios
        .get(`http://localhost:3001/api/get/search_product/category/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "id") {
      axios
        .get(`http://localhost:3001/api/get/search_product/id/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    }
  };

  return (
    <div>
      <Admin_Sidebar />
      <div className="employee_info">
        <Input type="text" placeholder="Search..." id="employee_input" action>
          <input />
          <select id="employee_options" name="options">
            <option value="name" selected>
              Name
            </option>
            <option value="id">ID</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
          <Button type="submit" onClick={handleSubmit}>
            Search
          </Button>
        </Input>
        {getSearchData.map((item,index) => {
          return (
            <div id={index}>
              <h2>{item.PRODUCT_ID}</h2>
              <h2>{item.PRODUCT_NAME}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product_Info;
