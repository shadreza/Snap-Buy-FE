import React, { useContext, useState, useEffect } from "react";
import { basket, presentBasket } from "../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Payment_details from "./Payment_details";

const Checkout = () => {
  const basketItems = useContext(basket);
  let totalPrice = 0;
  let basketArray = [];
  const history = useHistory();
  const BASKET = useContext(presentBasket);
  const handleCheckout = () => {
    let flag = 0;
    basketArray.map((item) => {
      allProduct.map((prd) => {
        if (prd.PRODUCT_ID === item.id) {
          if (item.qty > prd.PRODUCT_QUANTITY) {
            item.qty = prd.PRODUCT_QUANTITY;
          }
        }
      });
    });
    BASKET[1](basketArray);

    history.push("/payment");
  };
  const showingCheckouts = () => {
    basketItems[0].forEach((item) => {
      let name = item.PRODUCT_NAME;
      let price = item.PRODUCT_PRICE;
      let image = item.PRODUCT_IMAGE;
      let id = item.PRODUCT_ID;
      let category = item.PRODUCT_CATEGORY;

      if (basketArray.length !== 0) {
        for (let i = 0; i < basketArray.length; i++) {
          if (basketArray[i].id === id) {
            basketArray[i].qty++;
            totalPrice += basketArray[i].price;
            break;
          } else {
            if (i >= basketArray.length - 1) {
              const prd = {
                name: name,
                price: price,
                image: image,
                id: id,
                qty: 1,
                category: category,
              };
              basketArray.push(prd);
              totalPrice += prd.price;
              break;
            }
          }
        }
      } else {
        const prd = {
          name: name,
          price: price,
          image: image,
          id: id,
          qty: 1,
          category: category,
        };
        basketArray.push(prd);
        totalPrice += prd.price;
      }
    });
  };

  const addOneMore = (prd) => {
    let flag = 0;
    basketArray.map((item) => {
      allProduct.map((prd) => {
        if (prd.PRODUCT_ID === item.id) {
          if (item.qty > prd.PRODUCT_QUANTITY) {
            alert(`${prd.PRODUCT_NAME.toUpperCase()} is short `);
            flag = 1;
            item.qty = prd.PRODUCT_QUANTITY;
          }
        }
      });
    });
    if (flag === 0) {
      let product = {
        PRODUCT_ID: prd.id,
        PRODUCT_NAME: prd.name,
        PRODUCT_IMAGE: prd.image,
        PRODUCT_PRICE: prd.price,
        PRODUCT_CATEGORY: prd.category,
      };

      basketItems[1](() => [...basketItems[0], product]);
      removeOne(prd.PRODUCT_ID);
      showingCheckouts();
    }
  };

  const removeOne = (theId) => {
    handleCheckout();
    let newBasket = [];
    let label = 0;

    basketItems[0].forEach((item) => {
      if (item.PRODUCT_ID === theId) {
        if (label === 0) {
          label++;
        } else {
          newBasket.push(item);
        }
      } else {
        newBasket.push(item);
      }
    });
    basketItems[1](() => [...newBasket]);
    showingCheckouts();
  };

  const removeAll = (theId) => {
    let newBasket = [];

    basketItems[0].forEach((item) => {
      if (item.PRODUCT_ID === theId) {
      } else {
        newBasket.push(item);
      }
    });
    basketItems[1](() => [...newBasket]);
    showingCheckouts();
  };

  showingCheckouts();
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setAllProduct(response.data);
    });
    console.log("Basket array ", basketArray);
    console.log("basket item of 0 ", basketItems[0]);
  }, [basketArray]);

  return (
    <div>
      <div className="checkout-page-main-div">
        <div className="another-div">
          <h2>Your Basket</h2>

          <div className="items">
            {basketArray.map((item) => (
              <div className="individualPrdCard">
                <img src={item.image} />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.qty}</p>
                <p>{item.id}</p>
                <button
                  onClick={() => {
                    addOneMore(item);
                  }}
                >
                  Add One More
                </button>
                <button
                  onClick={() => {
                    removeOne(item.id);
                  }}
                >
                  Remove One
                </button>
                <button
                  onClick={() => {
                    removeAll(item.id);
                  }}
                >
                  Remove From Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* 
        <h4>Total Price : {totalPrice} BDT</h4>

        <div className="checkout-btn">
          <button>Checkout</button>
        </div>
      </div> */}
        {/* <div> */}
        <div class="ui left action input">
          <button class="ui teal labeled icon button" onClick={handleCheckout}>
            <i class="cart icon"></i>
            Checkout
          </button>
          <input type="text" readOnly="" value={totalPrice + " tk"} />
        </div>
      </div>
      <ToastContainer autoClose={1200} />
    </div>
  );
};

export default Checkout;
