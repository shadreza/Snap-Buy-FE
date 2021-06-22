import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { basket } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "./Product.css";
import { useStateValue } from "../StateProvider";

function Product({ product }) {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);
  const [{ cart }, dispatch] = useStateValue();
  const basketContext = useContext(basket);
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setAllProduct(response.data);
    });
  }, []);
  const addToCart = (prd) => {
    toast.dismiss();
    let count_prd = 0;
    let flag = 0;
    basketContext[0].map((item) => {
      if (item.PRODUCT_ID === prd.PRODUCT_ID) {
        count_prd++;
      }
    });

    allProduct.map((item) => {
      if (item.PRODUCT_ID <= count_prd) {
        flag = 1;
      }
    });
   // if (flag === 0) {
      basketContext[1]((cart) => [...basketContext[0], prd]);
    //} else {
     // alert(`${prd.PRODUCT_NAME.toUpperCase()} is short`);
    //}
  };

  return (
    <div className="products" style={{ textTransform: "capitalize" }}>
      <div className="product ">
        <div className="image" style={{}}>
          <img
            src={product.PRODUCT_IMAGE}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="product__info" style={{ cursor: "pointer" }}>
          <h4 className="productname">{product.PRODUCT_NAME}</h4>
          <p className="unit">{product.PRODUCT_UNIT}</p>
          <p className="product__price">
            <small>Tk </small>
            <strong>{product.PRODUCT_PRICE}</strong>
          </p>
        </div>
        <button
          onClick={() => {
            addToCart(product);
          }}
        >
          <p> Add to Cart</p>
        </button>

        {/* {click===true ? 
            <div className="plus__minus">
              <p className="minus__click"onClick={()=> setCount(count-1)}> - </p> 
              <p className="count__click"> {count} </p> 
              <p className="plus__click" onClick={()=>setCount(count+1)}> + </p>
            </div>
              : 
            <button onClick={()=>setClick(true)} > <p> Add to Cart</p></button>
          } */}
      </div>
      <ToastContainer autoClose={1400} />
    </div>
  );
}

export default Product;
