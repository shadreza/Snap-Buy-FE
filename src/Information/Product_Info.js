import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import "./Employee_Info.css";
import "../Home/Home.css";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";

const Product_Info = () => {
  const [getSearchData, setGetSearchData] = useState([]);
  const [getAllData, setGetAllData] = useState([]);
  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/get/product").then((response) => {
  //     setGetAllData(response.data);
  //     console.log(getAllData);
  //   });
  // });
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
      toast.error("Search Field is empty!!!", { position: "top-center" });
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
  const handleDelete = (delete_id) => {
    toast.success("Product Deleted Successfully", { position: "top-center" });
    axios.delete(`http://localhost:3001/api/delete/product/${delete_id}`);
    window.location.reload();
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
        <div className="home_div">
          {getSearchData.map((item, index) => {
            return (
              <div className="ui card">
                <img
                  src={item.PRODUCT_IMAGE}
                  style={{ width: "290px", height: "200px" }}
                />
                <div className="content">
                  <a className="">{item.PRODUCT_NAME}</a>
                  <div className="meta">
                    <span className="date">{item.PRODUCT_CATEGORY}</span>
                  </div>
                  <div className="description">
                    <span>Price : </span>
                    {item.PRODUCT_PRICE}
                  </div>
                  <div className="description">
                    <span>Quantity : </span>
                    {item.PRODUCT_QUANTITY}
                  </div>
                </div>
                <button
                  className="negative ui button"
                  onClick={() => handleDelete(item.PRODUCT_ID)}
                >
                  Remove Product
                </button>
                <button className="positive ui button">Request Stock</button>
              </div>
            );
          })}
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </div>
  );
};

export default Product_Info;
