import React , {useContext} from 'react';
import { basket } from '../../App';
import './Checkout.css';


const Checkout = () => {

    const basketItems = useContext(basket);
    let totalPrice = 0;
    let basketArray = [];

    const showingCheckouts = () => {    
        basketItems[0].forEach(item => {
            let name = item.PRODUCT_NAME;
            let price = item.PRODUCT_PRICE;
            let image = item.PRODUCT_IMAGE;
            let id = item.PRODUCT_ID;
            let category = item.PRODUCT_CATEGORY;

            if(basketArray.length !== 0) {
                for(let i = 0; i < basketArray.length; i++) {
                    if(basketArray[i].id === id) {
                        basketArray[i].qty++;
                        totalPrice += basketArray[i].price;
                        break;
                    } else {
                        if (i >= basketArray.length - 1) {
                            const prd = {
                            name  : name,
                            price : price,
                            image : image,
                            id    : id,
                            qty   : 1,
                            category : category
                            }
                            basketArray.push(prd);
                            totalPrice += prd.price;
                            break;
                        }
                    }
                }
            } else {
                const prd = {
                    name  : name,
                    price : price,
                    image : image,
                    id    : id,
                    qty   : 1,
                    category : category
                }
                basketArray.push(prd);
                totalPrice += prd.price;
            }
        })
    }

    const addOneMore = (prd) => {
        let product = {
            PRODUCT_ID       : prd.id ,
            PRODUCT_NAME     : prd.name ,
            PRODUCT_IMAGE    : prd.image,
            PRODUCT_PRICE    : prd.price , 
            PRODUCT_CATEGORY : prd.category,
        }
        basketItems[1](() => [...basketItems[0], product]);
        showingCheckouts();
    }

    const removeOne = (theId) => {

        let newBasket = [];
        let label = 0;

        basketItems[0].forEach(item =>{
            if(item.PRODUCT_ID === theId) {
                if(label === 0) {
                    label++;
                } else {
                    newBasket.push(item);
                }
            } else {
                newBasket.push(item);
            }
        })
        basketItems[1](() => [...newBasket]);
        showingCheckouts();
    }

    const removeAll = (theId) => {

        let newBasket = [];

        basketItems[0].forEach(item =>{
            if(item.PRODUCT_ID === theId) {
                
            } else {
                newBasket.push(item);
            }
        })
        basketItems[1](() => [...newBasket]);
        showingCheckouts();
    }

    showingCheckouts();

    return (
        <div className="checkout-page-main-div">
            <div className="another-div">

                <h2>Your Basket</h2>

                <div className="items">
                    {
                        basketArray.map(item => 
                            <div className="individualPrdCard">
                                <img src={item.image} />
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <p>{item.qty}</p>
                                <p>{item.id}</p>
                                <button onClick={()=>{addOneMore(item)}}>Add One More</button>
                                <button onClick={()=>{removeOne(item.id)}}>Remove One</button>
                                <button onClick={()=>{removeAll(item.id)}}>Remove From Cart</button>
                            </div>
                        )
                    }
                </div>
                
            </div>

            <h4>Total Price : {totalPrice} BDT</h4>

            <div className="checkout-btn">
                <button>Checkout</button>
            </div>

        </div>
    );
};

export default Checkout;