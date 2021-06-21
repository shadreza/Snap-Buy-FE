import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { useStateValue } from "../StateProvider";


function Product(product) {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);
  const [{ cart }, dispatch] = useStateValue();
  const addToCart = () => {
    // dispatch({
    //   type: "ADD_TO_CART",
    //   item: {
    //     id: product.id,
    //     product_name: product.product_name,
    //     image: product.image,
    //     unit: product.unit,
    //     price: product.price,
    //   },
    // });
  };

  return (
    <div className="products">
      <div className="product ">
        <div className="image" style={{}}>
          <img src={product.image} alt="" style={{ objectFit: "contain" }} />
        </div>

        <div className="product__info" style={{ cursor: "pointer" }}>
          <h4 className="productname">{product.product_name}</h4>
          <p className="unit">{product.unit}</p>
          <p className="product__price">
            <small>Tk </small>
            <strong>{product.price}</strong>
          </p>
        </div>
        <button onClick={addToCart}>
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
