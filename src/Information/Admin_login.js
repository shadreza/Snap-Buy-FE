import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";
import { useHistory } from "react-router-dom";

const Admin_login = () => {
  const [getAdminID, setGetAdminID] = useState("");
  const [error, setError] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/admin").then((response) => {
      setGetAdminID(response.data);
    });
  }, []);
  const history = useHistory();

  const handleSubmit = () => {
    let flag = 0;
    let name = document
      .getElementById("admin_username")
      .value.trim()
      .toLowerCase();
    let pass = document.getElementById("admin_pass").value.trim();
    getAdminID.map((item) => {
      if (
        item.ADMIN_NAME.toLowerCase() === name &&
        item.ADMIN_PASSWORD === pass
      ) {
        flag = 1;
      }
    });
    if (flag === 0) {
      toast.error("USERNAME Or PASSWORD DIDN'T MATCH", {
        position: "top-center",
      });
    } else {
      history.push("/info");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <div style={{ verticalAlign: "center" }}>
          <div className="ui placeholder segment">
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input
                      type="text"
                      placeholder="Username"
                      id="admin_username"
                    />
                    <i className="user icon"></i>
                  </div>
                </div>
                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input type="password" id="admin_pass" />
                    <i className="lock icon"></i>
                  </div>
                </div>
                <div className="ui blue submit button" onClick={handleSubmit}>
                  Login
                </div>
              </div>
            </div>
            <ToastContainer autoClose={1200} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_login;
