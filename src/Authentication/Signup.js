import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Signin.css";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  //   const [userInfo, setUserInfo] = useState({
  //     name: "",
  //     mail: "",
  //     gender: "",
  //     phone: "",
  //     house: "",
  //     street: "",
  //     postal: "",
  //   });
  const [id, setId] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/new_customer_id").then(
      (response) => {
        setId(response.data);
      }
    );
  }, []);
  const history = useHistory();

  let name, mail, gender, phone, house, street, postal, password;

  const register = (e) => {
    e.preventDefault();
    console.log("Last id : ", id);
    if (
      id.length === 0 ||
      name.length === 0 ||
      mail.length === 0 ||
      gender.length === 0 ||
      phone.length === 0 ||
      house.length === 0 ||
      street.length === 0 ||
      postal.length === 0
    ) {
      toast.error("Fill up the form properly!!!", { position: "top-center" });
    } else if (
      gender.trim().toLowerCase() !== "male" ||
      gender.trim().toLowerCase() !== "female"
    ) {
      toast.error("Gender can be either male or female ", {
        position: "top-center",
      });
    } else {
      Axios.post("http://localhost:3001/api/insert", {
        id: id,
        name: name.trim().toLowerCase(),
        mail: mail.trim().toLowerCase(),
        gender: gender.toLowerCase().trim(),
        phone: phone.trim().toLowerCase(),
        house: house.trim().toLowerCase(),
        street: street.trim().toLowerCase(),
        postal: postal.trim().toLowerCase(),
      });

      auth
        .createUserWithEmailAndPassword(mail, password)
        .then((auth) => {
          if (auth) {
            history.push("/signin");
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  const setValue = (val, type) => {
    if (type === "name") {
      name = val;
    }
    if (type === "mail") {
      mail = val;
    }
    if (type === "gender") {
      gender = val;
    }
    if (type === "phone") {
      phone = val;
    }
    if (type === "house") {
      house = val;
    }
    if (type === "street") {
      street = val;
    }
    if (type === "postal") {
      postal = val;
    }
    if (type === "password") {
      password = val;
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login__box">
          <h1>Sign Up</h1>
          <form>
            <h5>Name:</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setValue(e.target.value, "name")}
              required
            />
            <h5>E-mail</h5>
            <input
              type="text"
              value={mail}
              onChange={(e) => setValue(e.target.value, "mail")}
              required
            />
            <h5>Gender</h5>
            <input
              type="text"
              value={gender}
              onChange={(e) => setValue(e.target.value, "gender")}
              required
            />
            <h5>Phone No.</h5>
            <input
              type="text"
              value={phone}
              onChange={(e) => setValue(e.target.value, "phone")}
              required
            />
            <h5>Address</h5>
            <h3>House No.</h3>
            <input
              type="text"
              value={house}
              onChange={(e) => setValue(e.target.value, "house")}
              required
            />
            <h3>Street No.</h3>
            <input
              type="text"
              value={street}
              onChange={(e) => setValue(e.target.value, "street")}
              required
            />
            <h3>Postal Code</h3>
            <input
              type="text"
              value={postal}
              onChange={(e) => setValue(e.target.value, "postal")}
              required
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setValue(e.target.value, "password")}
              required
            />
            
            <button
              onClick={register}
              className="login__registerButton"
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              Sign Up
            </button>
          </form>
          <label class="container" style={{ alignSelf: "center" }}>
            <input
              type="checkbox"
              checked
              style={{ marginRight: "10px", marginTop: "15px" }}
            />
            <p>
              By signing up you agree to the Conditions of Use & Sale. Please
              see our Terms & Conditions to know more about our policy.
            </p>
          </label>
        </div>
      </div>
      <ToastContainer autoClose={1200} />
    </div>
  );
}

export default Signup;
