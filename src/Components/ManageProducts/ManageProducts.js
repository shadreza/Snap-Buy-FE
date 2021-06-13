import React from 'react';
import './ManageProducts.css';

const ManageProducts = () => {

    const handleSubmit = () => {

    }

    const removeProduct = () => {

    }

    return (
        <div className="manageProducts-main-div">
            <div className="current-products">
                <div className="manage-prd-header">
                    <h2>Manage Product</h2>
                </div>
                <div className="current-prd">
                    <div className="heading-all-prd">
                        <h3>Connected Products</h3>
                    </div>
                    <div className="all-prd">
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button  value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-another-prd">
                <h3>Add Another Product</h3>
                <form className="input-form">
                    <div className="row">
                        <div className="input-field">
                            <p>Name</p>
                            <input placeholder="Name" id="prdName" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Quantity</p>
                            <input placeholder="Quantity" id="prdQty" type="number" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Price</p>
                            <input placeholder="Price" id="prdPrice" type="number" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Image</p>
                            <input placeholder="Image" id="prdPrice" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Supplier Id</p>
                            <input placeholder="Supplier Id" id="prdSupplierId" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Manufactury Date</p>
                            <input placeholder="Manufactury Date" id="prdManifactueyDate" type="date" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Expiry Date</p>
                            <input placeholder="Expiry Date" id="prdExpiryDate" type="date" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <button id="button-add-prd" type="submit" name="action" onClick={e => handleSubmit(e)}>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default ManageProducts;