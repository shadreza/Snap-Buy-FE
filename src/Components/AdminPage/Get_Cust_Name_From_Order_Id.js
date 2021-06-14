import React, { useState, useEffect } from "react";
import axios from "axios";



const Get_Cust_Name_From_Order_Id = () => {
  const [getName, setGetName] = useState("");
  useEffect(() => {}, []);
  const handleSubmit = () => {
    const id = document.getElementById("try").value.trim().toLowerCase();
    axios
      .get(`http://localhost:3001/api/get/cust_name_from_order_id/${id}`)
      .then((response) => {
        setGetName(response.data);
        console.log(getName.ret);
      });
  };
  return (
    <div>
      <input type="text" id="try" />
      <button onClick={handleSubmit}>BUTTON !!!</button>
      <h2>{getName.ret}</h2>
    </div>
  );
};

export default Get_Cust_Name_From_Order_Id;
