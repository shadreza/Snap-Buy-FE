import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    history.push("./signup");
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
    </div>
  );
}

export default Signin;
