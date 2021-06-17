import React, { useEffect, useState } from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";

const Admin_login = () => {
  const [getAdminID, setGetAdminID] = useState("");
  const [error, setError] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/admin").then((response) => {
      setGetAdminID(response.data);
    });
  }, []);
  const handleSubmit = () => {};
  return (
    <>
      <Admin_Sidebar />
      <div className="ui placeholder segment">
        <div className="ui two column very relaxed stackable grid">
          <div className="column">
            <div className="ui form">
              <div className="field">
                <label>Username</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Username" />
                  <i className="user icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="ui left icon input">
                  <input type="password" />
                  <i className="lock icon"></i>
                </div>
              </div>
              <div
                className="ui blue submit button"
                onClick={() => handleSubmit}
              >
                Login
              </div>
            </div>
          </div>
          <div className="middle aligned column">
            <div className="ui big button">
              <i className="signup icon"></i>
              Sign Up
            </div>
          </div>
        </div>
        <div className="ui vertical divider">Or</div>
      </div>
    </>
  );
};

export default Admin_login;
