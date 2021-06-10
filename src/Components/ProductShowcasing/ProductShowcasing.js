import React from 'react';
import './ProductShowcasing.css';

const ProductShowcasing = ({product}) => {
    return (
        <div className='single-prd-div'>
            <h4>{product}</h4>
        </div>
    );
};

export default ProductShowcasing;