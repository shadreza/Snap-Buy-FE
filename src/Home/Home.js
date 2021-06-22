import React, { useState, useEffect, useContext } from "react";

import { search_product_context } from "../App";
import { basket } from "../App";
import { auth } from "../Authentication/firebase";
import { useStateValue } from "../StateProvider";
import Navbar from "../Navbar";
import axios from "axios";
import "./Home.css";
import Carousel from "./Carousel";
import Carousel_3slider from "./Carousel_3slider";

const Home = () => {

  const search_value = useContext(search_product_context);
  const [count, setCount] = useState(0);
  const basketContext = useContext(basket);
  const [allProduct, setAllProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [{ cart, user }, dispatch] = useStateValue();

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
  const addToCart = (prd) => {
    basketContext[1]((cart) => [...basketContext[0], prd]);
  };

  useEffect(() => {
    const results = allProduct.filter((item) =>
      item.PRODUCT_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);


  return (
    <div>

      <Navbar searchTerm={searchTerm} handleChange={handleChange} />

      <div>
        {searchTerm === null || searchTerm?.length === 0 ? (
          <>
            <Carousel />
            <div className="home_div">
              <Carousel_3slider />
              {allProduct.map((item) => {
                return (
                  <div className="ui card">
                    <div className="image">
                      <img src={item.PRODUCT_IMAGE} />

                    </div>
                    <div className="content">
                      <a className="">{item.PRODUCT_NAME}</a>
                      <div className="meta">
                        <span className="date">{item.PRODUCT_CATEGORY}</span>
                      </div>
                      <div className="description">
                        <small>Tk</small>
                        {item.PRODUCT_PRICE}
                      </div>
                    </div>
                    <button className="positive ui button">Add to cart</button>
                  </div>
                );
              })}
            </div>
          </>

        ) : (
          <div className="home_div" style={{ marginTop: "80px" }}>
            {searchResults.map((item) => {
              return (
                <div className="ui card">
                  <div className="image">
                    <img src={item.PRODUCT_IMAGE} />
                  </div>
                  <div className="content">
                    <a className="">{item.PRODUCT_NAME}</a>
                    <div className="meta">
                      <span className="date">{item.PRODUCT_CATEGORY}</span>
                    </div>
                    <div className="description">
                      <small>Tk</small>
                      {item.PRODUCT_PRICE}
                    </div>
                  </div>
                  <button className="positive ui button" onClick={()=>{addToCart(item)}}>Add to cart</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
