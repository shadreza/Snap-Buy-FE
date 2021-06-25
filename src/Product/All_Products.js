import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import Navbar from "../Navbar";
import Product from "./Product";

const All_Products = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);

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

  const search_query = searchResults.map((item) => {
    return (
      <Product
        key={item.PRODUCT_ID}
        id={item.PRODUCT_ID}
        product_name={item.PRODUCT_NAME}
        unit={item.PRODUCT_QUANTITY}
        image={item.PRODUCT_IMAGE}
        price={item.PRODUCT_PRICE}
      />
    );
  });

  const displayAllProducts = allProduct.map((item) => {
    return <Product product={item} />;
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
          border: "3px solid #4caf50",
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

export default All_Products;
