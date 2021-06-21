import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { basket } from "../App";
import "./Product.css";
import { useStateValue } from "../StateProvider";

function Product({product}) {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);
  const [{ cart }, dispatch] = useStateValue();
  const basketContext = useContext(basket);
  const addToCart = (prd) => {
    basketContext[1]((cart) => [...basketContext[0], prd]);
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
    </div>
  );
}

export default Product;
