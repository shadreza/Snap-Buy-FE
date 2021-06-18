import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Supplier.css";
import Admin_Sidebar from "./Admin_Sidebar.js";

const Supplier = () => {
  const [getSupplierList, setGetSupplierList] = useState([]);
  const [newSupplierID, setNewSupplierID] = useState("");
  const [error, setError] = useState(0);
  const history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/supplier").then((response) => {
      setGetSupplierList(response.data);
      console.log(getSupplierList);
    });
    axios
      .get("http://localhost:3001/api/get/new_supplier_id")
      .then((response) => {
        setNewSupplierID(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    console.log("New supplier id finally ", newSupplierID);
    toast.dismiss();
    let firstName = document
      .getElementById("first_name")
      .value.trim()
      .toLowerCase();
    let lastName = document
      .getElementById("last_name")
      .value.trim()
      .toLowerCase();
    let mail = document.getElementById("mail").value.trim().toLowerCase();

    let phnNumber = document
      .getElementById("phoneNo")
      .value.trim()
      .toLowerCase();
    let houseNo = document.getElementById("houseNo").value.trim().toLowerCase();
    let streetNo = document
      .getElementById("streetNo")
      .value.trim()
      .toLowerCase();
    let postalCode = document
      .getElementById("postalCode")
      .value.trim()
      .toLowerCase();

    if (
      firstName.length === 0 &&
      mail.length === 0 &&
      phnNumber.length === 0 &&
      houseNo.length === 0 &&
      streetNo.length === 0 &&
      postalCode.length === 0
    ) {
      toast.error("Fill up the form!!!", { position: "top-center" });
      setError(100);
    } else if (firstName.length === 0) {
      toast.error("Fill up first name!", { position: "top-center" });
      setError(1);
      e.preventDefault();
    } else if (firstName.length < 3) {
      toast.error("Name should atleast contain 3 letters!", {
        position: "top-center",
      });
      setError(1);
      e.preventDefault();
    } else if (mail.length === 0) {
      toast.error("Fill up the Mail Properly", { position: "top-center" });
      setError(2);
      e.preventDefault();
    } else if (phnNumber.length === 0) {
      toast.error("Fill up the Phone Number Properly", {
        position: "top-center",
      });
      setError(4);
      e.preventDefault();
    } else if (phnNumber.length > 0 && phnNumber.length < 11) {
      toast.error("Invalid Phone Number", { position: "top-center" });
      setError(4);
      e.preventDefault();
    } else if (houseNo.length === 0) {
      toast.error("Fill up House No!!!", { position: "top-center" });
      setError(5);
      e.preventDefault();
    } else if (streetNo.length === 0) {
      toast.error("Fill up the Street No!!!", { position: "top-center" });
      setError(6);
      e.preventDefault();
    } else if (postalCode.length === 0) {
      toast.error("Fill up the Postal Code!!!", { position: "top-center" });
      setError(7);
      e.preventDefault();
    } else if (mail.length > 0) {
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
      // mail id exists of not check it
      if (c1 > 3 && c2 > 3 && c3 > 2) {
        let found = 0;
        getSupplierList.map((item) => {
          if (item.SUPPLIER_MAIL === mail) {
            found = 1;
          }
        });
        if (found === 1) {
          toast.error("Email ID already exists!!!", { position: "top-center" });
          setError(2);
        } else {
          /// phone number exists or not check
          getSupplierList.map((item) => {
            if (item.SUPPLIER_PHONE === phnNumber) {
              found = 1;
            }
          });
          if (found === 1) {
            toast.error("Phone number already exists!!!", {
              position: "top-center",
            });
            setError(4);
          } else {
            axios.post("http://localhost:3001/api/insert/supplier", {
              id: newSupplierID,
              name: firstName + " " + lastName,
              mail: mail,
              phone: phnNumber,
              house: houseNo,
              street: streetNo,
              postal: postalCode,
            });
            toast.error("Submitted Successfully!!!", {
              position: "top-center",
            });
            window.location.reload();
            history.push("/overview/supplier");
          }
        }
      } else {
        toast.error("Please give valid Mail ID", { position: "top-center" });
        setError(2);
      }
    } else {
      axios.post("http://localhost:3001/api/insert/supplier", {
        id: newSupplierID,
        name: firstName + " " + lastName,
        mail: mail,
        phone: phnNumber,
        house: houseNo,
        street: streetNo,
        postal: postalCode,
      });
      toast.success("Submitted Successfully!!!", { position: "top-center" });
      history.push("/overview/supplier");
      window.location.reload();
    }
    // e.preventDefault();
  };

  return (
    <div>
      <Admin_Sidebar className="admin__sidebar" />
      <div className="supplier__page">
        <h2>Supplier</h2>
        <div className="ui equal width form" id="supplier__form">
          <div className="fields">
            <div
              className={error === 1 || error === 100 ? "field error" : "field"}
            >
              <label>First Name*</label>
              <input
                placeholder="First Name"
                type="text"
                className="first_name"
                id="first_name"
                style={{ height: "20px" }}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                placeholder="Last Name (Optional)"
                type="text"
                className="last_name"
                id="last_name"
                style={{ height: "20px" }}
              />
            </div>
          </div>
          <div
            className={error === 2 || error === 100 ? "field error" : "field"}
          >
            <label>Mail*</label>
            <input
              placeholder="Mail"
              type="text"
              className="mail"
              id="mail"
              style={{ height: "20px" }}
            />
          </div>
          <div
            className={error === 4 || error === 100 ? "field error" : "field"}
          >
            <label>Phone No.*</label>
            <input
              placeholder="Phone No"
              type="text"
              className="phoneNo"
              id="phoneNo"
              style={{ height: "20px" }}
            />
          </div>
          <div className="fields">
            <div
              className={error === 5 || error === 100 ? "field error" : "field"}
            >
              <label>House No.*</label>
              <input
                type="text"
                placeholder="House No."
                id="houseNo"
                style={{ height: "20px" }}
              />
            </div>
            <div
              className={error === 6 || error === 100 ? "field error" : "field"}
            >
              <label>Street No.*</label>
              <input
                type="text"
                placeholder="Street No."
                id="streetNo"
                style={{ height: "20px" }}
              />
            </div>
            <div
              className={error === 7 || error === 100 ? "field error" : "field"}
            >
              <label>Postal Code*</label>
              <input
                type="text"
                placeholder="Postal Code"
                id="postalCode"
                style={{ height: "20px" }}
              />
            </div>
          </div>

          <button className="positive ui button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Supplier;
