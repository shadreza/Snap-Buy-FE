import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Toast } from "react-bootstrap";

const Employee_handles = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/order_info").then((response) => {
      setAllData(response.data);
    });
  }, []);
   const handleDelete = (delete_id) => {
     axios.delete(`http://localhost:3001/api/delete/employee/${delete_id}`);
     toast.success("Employee Successfully Deleted!!!", {
       position: "top-center",
     });
     window.location.reload();
   };
  return (
    <div>
      {allData.map((item) => {
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
                  {item.ORDER_ID}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <p>
                    <span style={{ fontWeight: "600" }}> Mail ID </span>
                    {" : " + item.ORDER_TOTAL_COST}
                  </p>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  <p>
                    <span style={{ fontWeight: "600" }}> Phone No. </span>
                    {" :  " + item.ORDER_TIME}
                  </p>
                </Card.Subtitle>

                <Card.Text>
                  <p>
                    <span style={{ fontWeight: "600" }}> Address </span>
                    {" : " + item.ORDER_QUANTITY}
                  </p>
                  <br />
                </Card.Text>
              </Card.Body>
              <br />
              <button
                className="negative ui button"
                style={{ marginLeft: "auto" }}
                onClick={() => handleDelete(item.ORDER_ID)}
              >
                Remove
              </button>
            </Card>
          </>
        );
      })}
    </div>
  );
};

export default Employee_handles;
