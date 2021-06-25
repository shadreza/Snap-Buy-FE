import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Admin_Sidebar from "../Components/AdminPage/Admin_Sidebar";
import axios from "axios";

const Info = () => {
  const [getCustomerData, setGetCustomerData] = useState([]);
  const [getProductData, setGetProductData] = useState([]);
  const [getPopularProducts, setGetPopularProducts] = useState([]);
  const [getStockOutProducts, setGetStockOutProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/customer").then((response) => {
      setGetCustomerData(response.data);
      console.log(getCustomerData);
    });
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setGetProductData(response.data);
      console.log(getProductData);
    });
    axios
      .get("http://localhost:3001/api/get/popular_products")
      .then((response) => {
        setGetPopularProducts(response.data);
        console.log("where are the products ", getPopularProducts[0]);
      });
    axios
      .get("http://localhost:3001/api/get/stock_out_products")
      .then((response) => {
        setGetStockOutProducts(response.data);
      });
  }, []);

  const [selectedId, setSelectedId] = useState(0);
  const handleModal = (id) => {
    if (id === selectedId) {
      setSelectedId(0);
    } else {
      setSelectedId(id);
    }
    console.log(selectedId);
  };

  const allCustFunc = () => {
    getCustomerData.map((item) => {
      return (
        <div>
          <h3>{item.CUST_NAME}</h3>
        </div>
      );
    });
  };

  return (
    <>
      <Admin_Sidebar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            borderRadius: "15px",
            width: "300px",
            height: "100px",
            boxShadow: "2px 1px 6px 1px grey",
            borderRight: "6px solid black",
            margin: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => handleModal(1)}
        >
          <p
            style={{
              margin: "10px",
              fontSize: "14px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Total Customers :{" "}
            <span
              style={{
                fontSize: "20px",
                color: "darkgreen",
              }}
            >
              {getCustomerData.length}
            </span>
          </p>
        </div>
        <div
          style={{
            borderRadius: "15px",
            width: "300px",
            height: "100px",
            boxShadow: "2px 1px 6px 1px grey",
            borderRight: "6px solid black",

            margin: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          onClick={() => handleModal(2)}
        >
          <p
            style={{
              margin: "10px",
              fontSize: "14px",
              color: "black",
            }}
          >
            Total Products :{" "}
            <span
              style={{
                fontSize: "20px",
                color: "darkgreen",
              }}
            >
              {getProductData.length}
            </span>
          </p>
        </div>
        <div
          style={{
            borderRadius: "15px",
            width: "300px",
            height: "100px",
            boxShadow: "2px 1px 6px 1px grey",
            borderRight: "6px solid black",
            margin: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          onClick={() => handleModal(3)}
        >
          <p
            style={{
              margin: "10px",
              fontSize: "14px",
              color: "black",
            }}
          >
            Popular Products :{" "}
            <span
              style={{
                fontSize: "20px",
                color: "darkgreen",
              }}
            >
              {getPopularProducts[0]?.PRODUCT_NAME}
            </span>
          </p>
        </div>
        <div
          style={{
            borderRadius: "15px",
            width: "300px",
            height: "100px",
            boxShadow: "2px 1px 6px 1px grey",
            borderRight: "6px solid black",
            margin: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          onClick={() => handleModal(4)}
        >
          <p
            style={{
              margin: "10px",
              fontSize: "14px",
              color: "black",
            }}
          >
            Stock Out Products :{" "}
            <span
              style={{
                fontSize: "20px",
                color: "darkgreen",
              }}
            >
              {getStockOutProducts?.length}
            </span>
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {selectedId === 1 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "20px",
              justifyContent: "space-around",
            }}
          >
            {getCustomerData.map((item) => {
              return (
                <div
                  style={{
                    borderRadius: "15px",
                    width: "300px",
                    height: "auto",
                    boxShadow: "2px 1px 6px 1px grey",
                    borderRight: "6px solid darkgreen",
                    marginTop: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    paddingBottom: "15px",
                    paddingTop: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Name :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.CUST_NAME}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Phone :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.CUST_PHONE}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Gender :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.CUST_GENDER}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    House No. :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.CUST_ADDRESS.HOUSE_NO}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Street No :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.CUST_ADDRESS.STREET_NO}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Postal Code :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.CUST_ADDRESS.POSTAL_CODE}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {selectedId === 2 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "20px",
              justifyContent: "space-around",
            }}
          >
            {getProductData.map((item) => {
              return (
                <div
                  style={{
                    borderRadius: "15px",
                    width: "300px",
                    height: "auto",
                    boxShadow: "2px 1px 6px 1px grey",
                    borderRight: "6px solid darkgreen",
                    marginTop: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    paddingBottom: "15px",
                    paddingTop: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Name :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.PRODUCT_NAME}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    Price :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.PRODUCT_PRICE}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    QUANTITY :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.PRODUCT_QUANTITY}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: "14px",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Category :{" "}
                    <span
                      style={{
                        color: "darkgreen",
                      }}
                    >
                      {item.PRODUCT_CATEGORY}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {/* {selectedId === 1 ? <h3> what's up my gggggg</h3> : null} */}
      </div>
    </>
  );
};

export default Info;
