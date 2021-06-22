import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import Navbar from "../Navbar";
import Product from "./Product";

const Meat_and_Chicken = () => {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setAllProduct(response.data);
      console.log(allProduct);
    });
  }, []);
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = allProduct.filter((item) =>
      item.PRODUCT_NAME?.toLowerCase().includes(
        searchTerm?.trim().toLowerCase()
      )
    );
    setSearchResults(results);
  }, [searchTerm]);

  const displayAllProducts = allProduct.map((item) => {
    if (
      item.PRODUCT_CATEGORY === "meat_and_chicken" ||
      item.PRODUCT_CATEGORY === "meat"
    ) {
      return <Product product={item} />;
    }
  });

  return (
    <div>
      <ScrollToTop
        top="200"
        style={{
          background: "white",
          borderRadius: "50%",
          padding: "5px",
          color: "black",
          border: "2px solid #4caf50",
        }}
      />
      <Navbar searchTerm={searchTerm} handleChange={handleChange} />

      <div
        style={{
          display: "flex",
          marginTop: "80px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {searchTerm === null || searchTerm?.length === 0 ? (
          <>{displayAllProducts}</>
        ) : (
          <>
            {searchResults.map((item) => {
              return <Product product={item} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Meat_and_Chicken;
