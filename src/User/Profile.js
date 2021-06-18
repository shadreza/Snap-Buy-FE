import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "../StateProvider";
import "./Profile.css";

const Profile = () => {
  const [{ cart, user }, dis] = useStateValue();
  const [userDetails, setUserDetails] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [error, setError] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/customer/${user}`)
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      });
    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setAllCustomer(response.data);
    });
  }, []);

  const handleChange = (e) => {
    let first_name = document
      .getElementById("customer_name")
      .value.trim()
      .toLowerCase();
    let phone = document
      .getElementById("customer_phone")
      .value.trim()
      .toLowerCase();
    let gender = document
      .getElementById("customer_gender")
      .value.trim()
      .toLowerCase();
    let mail = document
      .getElementById("customer_mail")
      .value.trim()
      .toLowerCase();
    let house_no = document
      .getElementById("customer_house")
      .value.trim()
      .toLowerCase();
    let street_no = document
      .getElementById("customer_street")
      .value.trim()
      .toLowerCase();

    let postal_code = document
      .getElementById("customer_postal")
      .value.trim()
      .toLowerCase();
    toast.error("something happening ");

    if (first_name.length === 0) {
      first_name = userDetails[0].CUST_NAME;
    }
    if (mail.length === 0) {
      mail = userDetails[0].CUST_MAIL;
    }
    if (gender.length === 0) {
      gender = userDetails[0].CUST_GENDER;
    }
    if (phone.length === 0) {
      phone = userDetails[0].CUST_PHONE;
    }
    if (house_no.length === 0) {
      house_no = userDetails[0].CUST_ADDRESS.HOUSE_NO;
    }
    if (street_no.length === 0) {
      mail = userDetails[0].CUST_ADDRESS.STREET_NO;
    }
    if (postal_code.length === 0) {
      postal_code = userDetails[0].CUST_ADDRESS.POSTAL_CODE;
    }
    

    axios.put("http://localhost:3001/api/update/customer", {
      name: first_name,
      mail: mail,
      gender: gender,
      phone: phone,
      house_no: house_no,
      street_no: street_no,
      postal_code: postal_code,
      previous_mail: user,
    });
  };
  return (
    <div>
      <h1>{user}</h1>
      {/* <h1>{userDetails}</h1> */}
      {userDetails.map((item) => {
        return (
          <>
            <input
              type="text"
              placeholder={item.CUST_NAME}
              id="customer_name"
            />
            <input
              type="text"
              id="customer_phone"
              placeholder={item.CUST_PHONE}
            />
            <input
              type="text"
              id="customer_gender"
              placeholder={item.CUST_GENDER}
            />
            <input
              type="text"
              id="customer_mail"
              placeholder={item.CUST_MAIL}
            />
            <input
              type="text"
              id="customer_house"
              placeholder={item.CUST_ADDRESS.HOUSE_NO}
            />
            <input
              type="text"
              id="customer_street"
              placeholder={item.CUST_ADDRESS.STREET_NO}
            />
            <input
              type="text"
              id="customer_postal"
              placeholder={item.CUST_ADDRESS.POSTAL_CODE}
            />
            <button onClick={(e) => handleChange(e)}>Submit</button>
          </>
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default Profile;
