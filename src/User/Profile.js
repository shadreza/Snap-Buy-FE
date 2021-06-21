import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "../StateProvider";
import Navbar from "../Navbar";
import "./Profile.css";
import "semantic-ui-css/semantic.min.css";

const Profile = () => {
  const [{ cart, user }, dis] = useStateValue();
  const [userDetails, setUserDetails] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [previousmail, setPreviousmail] = useState(null);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [mail, setMail] = useState(null);
  const [gender, setGender] = useState(null);
  const [house, setHouse] = useState(null);
  const [street, setStreet] = useState(null);
  const [postal, setPostal] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/customer/${user}`)
      .then((response) => {
        setUserDetails(response.data);
      });
    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setAllCustomer(response.data);
    });

    allCustomer.map((item, index) => {
      if (item.CUST_MAIL === user) {
        setName(item.CUST_NAME);
        setPhone(item.CUST_PHONE);
        setMail(item.CUST_MAIL);
        setGender(item.CUST_GENDER);
        setHouse(item.CUST_ADDRESS.HOUSE_NO);
        setStreet(item.CUST_ADDRESS.STREET_NO);
        setPostal(item.CUST_ADDRESS.POSTAL_CODE);
        setPreviousmail(user);
      }
    });
  }, []);

  const handleChange = (e) => {
    // let first_name = document
    //   .getElementById("customer_name")
    //   .value.trim()
    //   .toLowerCase();
    // let phone = document
    //   .getElementById("customer_phone")
    //   .value.trim()
    //   .toLowerCase();
    // let gender = document
    //   .getElementById("customer_gender")
    //   .value.trim()
    //   .toLowerCase();
    // let mail = document
    //   .getElementById("customer_mail")
    //   .value.trim()
    //   .toLowerCase();
    // let house_no = document
    //   .getElementById("customer_house")
    //   .value.trim()
    //   .toLowerCase();
    // let street_no = document
    //   .getElementById("customer_street")
    //   .value.trim()
    //   .toLowerCase();

    // let postal_code = document
    //   .getElementById("customer_postal")
    //   .value.trim()
    //   .toLowerCase();
    // toast.error("something happening ");

    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setAllCustomer(response.data);
    });

    allCustomer.map((item, index) => {
      if (item.CUST_MAIL === user) {
        setName(item.CUST_NAME);
        setPhone(item.CUST_PHONE);
        setMail(item.CUST_MAIL);
        setGender(item.CUST_GENDER);
        setHouse(item.CUST_ADDRESS.HOUSE_NO);
        setStreet(item.CUST_ADDRESS.STREET_NO);
        setPostal(item.CUST_ADDRESS.POSTAL_CODE);
        setPreviousmail(user);
      }
    });
    if (name?.length === 0) {
      setName(userDetails[0].CUST_NAME);
    }
    if (mail?.length === 0) {
      setMail(userDetails[0].CUST_MAIL);
    }
    if (gender?.length === 0) {
      setGender(userDetails[0].CUST_GENDER);
    }
    if (phone?.length === 0) {
      setPhone(userDetails[0].CUST_PHONE);
    }
    if (house?.length === 0) {
      setHouse(userDetails[0].CUST_ADDRESS.HOUSE_NO);
    }
    if (street?.length === 0) {
      setStreet(userDetails[0].CUST_ADDRESS.STREET_NO);
    }
    if (postal?.length === 0) {
      setPostal(userDetails[0].CUST_ADDRESS.POSTAL_CODE);
    }
    if (previousmail?.length === 0) {
      setPreviousmail(userDetails[0].CUST_MAIL);
    }
    if (name?.length < 3) {
    }
    if (mail?.length > 0) {
      let c1 = 1,
        c2 = 0,
        c3 = 0;
      for (let i = 1; i < mail.length; i++) {
        if (mail[i] === "@") {
          c2 += 1;
        } else if (mail[i] === ".") {
          c3 += 1;
        } else {
          if (c2 > 0 && c3 === 0) {
            c2 += 1;
          } else if (c3 > 0) {
            c3 += 1;
          } else {
            c1 += 1;
          }
        }
      }
      // mail id exists or not check it
      if (c1 > 3 && c2 > 3 && c3 > 2) {
        let found = 0;
        allCustomer.map((item) => {
          if (mail !== user && item.CUST_MAIL === mail) {
            found = 1;
          }
        });
        if (found === 1) {
          toast.error("Email ID already exists!!!", { position: "top-center" });
        } else {
          /// phone number exists or not check
          allCustomer.map((item) => {
            if (
              item.CUSTOMER_PHONE === phone &&
              phone !== userDetails[0].CUST_PHONE
            ) {
              found = 1;
            }
          });
          if (found === 1) {
            toast.error("Phone number already exists!!!", {
              position: "top-center",
            });
          } else {
            axios.post("http://localhost:3001/api/update/customer", {
              name: name,
              gender: gender,
              phone: phone,
              house: house,
              street: street,
              postal: postal,
              previous_mail: user,
            });
            window.location.reload();
            toast.success("Updated Successfully!!!", {
              position: "top-center",
            });
          }
        }
      } else {
        toast.error("Please give valid Mail ID", { position: "top-center" });
      }
    } else {
      setGender(document.getElementById("cust_gender").value);
      axios.post("http://localhost:3001/api/update/customer", {
        name: name,
        gender: gender,
        phone: phone,
        house: house,
        street: street,
        postal: postal,
        previous_mail: previousmail,
      });
      window.location.reload();
      toast.success("Updated Successfully!!!", {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <Navbar />
      <div className="employee" style={{ marginTop: "80px" }}>
        <h2>Profile</h2>
        {allCustomer.map((item, index) => {
          if (item.CUST_MAIL === user) {
            return (
              <>
                <div className="ui equal width form" id="employee_form">
                  <div className="field">
                    <label>Name*</label>
                    <input
                      type="text"
                      id="customer_name"
                      style={{ textTransform: "capitalize" }}
                      onChange={(e) => setName(e.target.value)}
                      value={name === null ? item.CUST_NAME : name}
                    />
                  </div>
                  <div className="field">
                    <label>Phone No*</label>

                    <input
                      type="text"
                      id="customer_phone"
                      value={phone === null ? item.CUST_PHONE : phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Gender*</label>
                    <select
                      className="ui fluid search dropdown"
                      name="gender"
                      id="cust_gender"
                    >
                      {item.CUST_GENDER === "male" ? (
                        <>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </>
                      ) : (
                        <>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </>
                      )}
                    </select>
                    {/* <input
                      type="text"
                      id="customer_gender"
                      style={{ textTransform: "capitalize" }}
                      value={gender === null ? item.CUST_GENDER : gender}
                      onChange={(e) => setGender(e.target.value)}
                    /> */}
                  </div>
                  <div className="field">
                    <label>Mail*</label>
                    <input
                      type="text"
                      id="customer_mail"
                      readonly=""
                      value={mail === null ? item.CUST_MAIL : mail}
                      onChange={(e) => setMail(e.target.value)}
                    />
                  </div>
                  <div className="fields">
                    <div className="field">
                      <label>House No*</label>
                      <input
                        type="text"
                        id="customer_house"
                        style={{ textTransform: "capitalize" }}
                        value={
                          house === null ? item.CUST_ADDRESS.HOUSE_NO : house
                        }
                        onChange={(e) => setHouse(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Street No*</label>
                      <input
                        type="text"
                        id="customer_street"
                        value={
                          street === null ? item.CUST_ADDRESS.STREET_NO : street
                        }
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Postal Code*</label>
                      <input
                        type="text"
                        id="customer_postal"
                        style={{ textTransform: "capitalize" }}
                        value={
                          postal === null
                            ? item.CUST_ADDRESS.POSTAL_CODE
                            : postal
                        }
                        onChange={(e) => setPostal(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="positive ui button"
                    onClick={(e) => handleChange(e)}
                  >
                    Update
                  </button>
                </div>
              </>
            );
          }
        })}

        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
