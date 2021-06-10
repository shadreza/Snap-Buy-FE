import React from 'react';
import ProductShowcasing from '../ProductShowcasing/ProductShowcasing';
import './Homepage.css';
const Homepage = () => {
    const productsArray = ['1','2','3','4','5','6','7','8','9'];
    return (
        <div className="homepage-div">
            <h3>All Your Products</h3>
            <div className="products-gallery">
                {
                    productsArray.map(product => <ProductShowcasing product={product} />)
                }
            </div>
        </div>
    );
};

export default Homepage;