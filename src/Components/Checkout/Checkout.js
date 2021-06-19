import React , {useContext} from 'react';
import { basket } from '../../App';
import './Checkout.css';


const Checkout = () => {

    const basketItems = useContext(basket);
    let totalPrice = 0;
    let basketArray = [];

    const addOneMore = (id) => {
        
    }

    basketItems[0].forEach(item => {
        let name = item.PRODUCT_NAME;
        let price = item.PRODUCT_PRICE;
        let image = item.PRODUCT_IMAGE;
        let id = item.PRODUCT_ID;

        if(basketArray.length !== 0) {
            for(let i = 0; i < basketArray.length; i++) {
                if(basketArray[i].id === id) {
                    console.log(id)
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
                        qty   : 1
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
                qty   : 1
            }
            basketArray.push(prd);
            totalPrice += prd.price;
        }
    })

    return (
        <div>
            <div className="checkout-page-main-div">

                This is the checkout page

                <div className="items">
                    {
                        basketArray.map(item => 
                            <div className="individualPrdCard">
                                <img src={item.image} />
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <p>{item.qty}</p>
                                <button onClick={()=>{addOneMore(item.id)}}>Add One More</button>
                                <button>Remove One</button>
                                <button>Remove From Cart</button>
                            </div>
                        )
                    }
                </div>
                
            </div>

            <h4>Total Price : {totalPrice} BDT</h4>

        </div>
    );
};

export default Checkout;