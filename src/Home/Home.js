import React, { useState, useEffect, useContext } from "react";
import { search_product_context } from "../App";
import { auth } from "../Authentication/firebase";
import Navbar from "../Navbar";
import axios from "axios";
import "./Home.css";
import Carousel from "./Carousel";
import Carousel_3slider from "./Carousel_3slider";

const Home = () => {
  const [count, setCount] = useState(0);
  const [allProduct, setAllProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setAllProduct(response.data);
      console.log(allProduct);
    });
  }, []);

  const search_value = useContext(search_product_context);

  return (
    <>
      <Navbar />
      <Carousel />
      <Carousel_3slider />
      <div>
        {search_value[0].length === 0 ? (
          <div className="home_div">
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
                    <div className="description">{item.PRODUCT_PRICE}</div>
                  </div>
                  <button className="positive ui button">Add to cart</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="home_div">
            {search_value[0].map((item) => {
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
                    <div className="description">{item.PRODUCT_PRICE}</div>
                  </div>
                  <button className="positive ui button">Add to cart</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
