import React, { useEffect } from "react";
import axios from "axios";
import { Card, Toast } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { MdDeleteForever } from "react-icons/md";
import "./Employee_Info.css";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";

const Employee_Info = () => {
  const [getSearchData, setGetSearchData] = useState([]);
  const [getAllData, setGetAllData] = useState([]);
  // const [previousSearchData, setPreviousSearchData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/api/get/employee`)
  //     .then((response) => {
  //       setGetSearchData(response.data);
  //       console.log(getSearchData);
  //     });
  // }, [previousSearchData]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/employee").then((response) => {
      setGetSearchData(response.data);
      console.log(getSearchData);
    });
  }, []);
  const handleDelete = (delete_id) => {
    axios.delete(`http://localhost:3001/api/delete/employee/${delete_id}`);
    toast.success("Employee Successfully Deleted!!!", {
      position: "top-center",
    });
    window.location.reload();
  };
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
      toast.error("Search Field is empty!!!", {position: "top-center" });
    } else if (selected_option === "name") {
      axios
        .get(`http://localhost:3001/api/get/search_employee/name/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "mail") {
      axios
        .get(`http://localhost:3001/api/get/search_employee/mail/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "phone") {
      axios
        .get(`http://localhost:3001/api/get/search_employee/phone/${search}`)
        .then((response) => {
          setGetSearchData(response.data);
          console.log(getSearchData);
        });
    } else if (selected_option === "id") {
      axios
        .get(`http://localhost:3001/api/get/search_employee/id/${search}`)
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
            <option value="phone">Phone No.</option>
            <option value="mail">Mail</option>
          </select>
          <Button type="submit" onClick={handleSubmit}>
            Search
          </Button>
        </Input>
        <div
          style={{
            display: "flex",
            margin: "20px",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {getSearchData &&
            getSearchData.map((item) => {
              return (
                <>
                  <Card
                    style={{
                      width: "40rem",
                      boxShadow: "5px 10px 18px #888888",
                      padding: "10px",
                      paddingLeft: "30px",
                      display: "inline-flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Body className="cards">
                      <Card.Title
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          marginTop: "20px",
                        }}
                      >
                        {item.EMPLOYEE_ID + ". " + item.EMPLOYEE_NAME}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <p>
                          <span style={{ fontWeight: "600" }}> Mail ID </span>
                          {" :  " + item.EMPLOYEE_MAIL}
                        </p>
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        <p>
                          <span style={{ fontWeight: "600" }}> Phone No. </span>
                          {" :  " + item.EMPLOYEE_PHONE}
                        </p>
                      </Card.Subtitle>

                      <Card.Text>
                        <p>
                          <span style={{ fontWeight: "600" }}> Address </span>
                          {" : " +
                            " " +
                            item.EMPLOYEE_ADDRESS.HOUSE_NO +
                            " " +
                            item.EMPLOYEE_ADDRESS.STREET_NO +
                            " " +
                            item.EMPLOYEE_ADDRESS.POSTAL_CODE}
                        </p>
                        <br />
                      </Card.Text>
                    </Card.Body>
                    <br />
                    <button
                      className="negative ui button"
                      style={{ marginLeft: "auto" }}
                      onClick={() => handleDelete(item.EMPLOYEE_ID)}
                    >
                      Remove
                    </button>
                  </Card>
                </>
              );
            })}
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </div>
  );
};

export default Employee_Info;
