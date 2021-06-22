import React, { useEffect, useState } from "react";
import "./AdminAddsPrd.css";
import axios from "axios";

const AdminAddsPrd = () => {
  const [allPrds, setAllPrds] = useState([]);

  const setPrd = () => {
    // axios
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setAllPrds(response.data);
    });
  };

  const add10more = (id) => {
    // adding 10 more
    let prev_qty = 0;
    allPrds.map((item) => {
      if (item.PRODUCT_ID === id) {
        prev_qty = id;
      }
    });
    axios.post("http://localhost:3001/api/update/product", {
      id: id,
      qty: parseInt(prev_qty) + 10,
    });
    window.location.reload();
  };

  useEffect(() => {
    setPrd();
  }, allPrds);

  return (
    <div className="admin-adding-prd">
      {allPrds.map((item) => (
        <div className="prd" style={{ display: "flex", width: "500px" }}>
          <img
            src={item.PRODUCT_IMAGE}
            alt=""
            style={{ width: "200px", height: "200px" }}
          />
          <p>{item.PRODUCT_NAME}</p>
          <p>{item.PRODUCT_QUANTITY}</p>
          <button
            onClick={() => {
              add10more(item.PRODUCT_ID);
            }}
          >
            Add 10 more
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminAddsPrd;
