import React, { useEffect } from "react";
import axios from "axios";
import M from "materialize-css";
import { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { MdDeleteForever } from "react-icons/md";
import "./Employee_Info.css";
import "semantic-ui-css/semantic.min.css";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";

const Employee_Info = () => {
  const [getSearchData, setGetSearchData] = useState([]);
  // const [previousSearchData, setPreviousSearchData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/api/get/employee`)
  //     .then((response) => {
  //       setGetSearchData(response.data);
  //       console.log(getSearchData);
  //     });
  // }, [previousSearchData]);
  const handleDelete = (delete_id) => {
    axios.delete(`http://localhost:3001/api/delete/employee/${delete_id}`);    
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
      M.toast({ html: "Search Field is empty!!!", classes: "red rounded" });
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
        {getSearchData.map((item) => {
          return (
            <div className="all_info_card">
              <div className="info_card">
                <p style={{ marginLeft: "20px" }}>{item.EMPLOYEE_ID}</p>
                <p>{item.EMPLOYEE_NAME}</p>
                <p>{item.EMPLOYEE_PHONE}</p>
                <p>{item.EMPLOYEE_ADDRESS.HOUSE_NO}</p>
                <MdDeleteForever
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                    marginRight: "15px",
                    fontSize: "20px",
                  }}
                  onClick={() => handleDelete(item.EMPLOYEE_ID)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employee_Info;
