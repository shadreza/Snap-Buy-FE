import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./firebase";
import "./Signin.css";
import { loggedInUser } from "../App";

function Signin() {
  const userInfo = useContext(loggedInUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signin = (e) => {
    e.preventDefault();
    let selected_options = document.getElementById("options").value;
    console.log("selected ", selected_options);
    if (selected_options === null || selected_options?.length === 0) {
      toast.error("Please select sign in as ", { position: "top-center" });
    } else if (selected_options === "customer") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          console.log(auth.user.email);
          const USER = {
            name: auth.user.displayName,
            email: auth.user.email,
            phone: auth.user.phoneNumber,
            image: auth.user.photoURL,
            isSignedIn: true,
          };
          userInfo[1](USER);
          history.push("/");
        })
        .catch((error) =>
          toast.error(error.message, { position: "top-center" })
        );
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          console.log(auth.user.email);
          const USER = {
            name: auth.user.displayName,
            email: auth.user.email,
            phone: auth.user.phoneNumber,
            image: auth.user.photoURL,
            isSignedIn: true,
          };
          userInfo[1](USER);
          history.push("/info/product");
        })
        .catch((error) =>
          toast.error(error.message, { position: "top-center" })
        );
    }
  };

  const register = (e) => {
    history.push("/signup");
  };

  return (
    <div>
      <div className="login__signin">
        <div className="login__box">
          <h1>Sign In</h1>
          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select
              id="options"
              name="options"
              style={{
                width: "100px",
                height: "40px",
                boxShadow: "2px 0px 6px 1px grey",
                border: "none",
                borderRadius: "4px",
              }}
            >
              <option value="" style={{ fontWeight: "bold", color: "green" }}>
                Sign in as*
              </option>
              <option
                value="customer"
                style={{ fontWeight: "bold", color: "green" }}
              >
                Customer
              </option>
              <option
                value="employee"
                style={{ fontWeight: "bold", color: "green" }}
              >
                Employee
              </option>
            </select>
            <button
              type="submit"
              onClick={signin}
              className="login__signInButton"
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              Sign In
            </button>
          </form>
          <label class="container" style={{ alignSelf: "center" }}>
            <input
              type="checkbox"
              checked
              style={{ marginRight: "10px", marginTop: "5px" }}
            />
            By signing in you agree to the Conditions of Use & Sale. Please see
            our Terms & Conditions to know more about our policy.
          </label>
          <button
            onClick={register}
            className="login__registerButton"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            Create New Account
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1400} />
    </div>
  );
}

export default Signin;
