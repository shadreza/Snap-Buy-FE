import React, { useState } from 'react';
import ManageAdmin from '../ManageAdmin/ManageAdmin';
import ManageEmployee from '../ManageEmployee/ManageEmployee';
import ManageProducts from '../ManageProducts/ManageProducts';
import ManageSuppliers from '../ManageSuppliers/ManageSuppliers';
import './AdminPage.css';

const AdminPage = () => {

    const [selectedButton , setSelectdButton] = useState('admin')

    const handleButtonClick = (e) => {
        let idName;
        idName = selectedButton + '-btn';
        document.getElementById(idName).classList.remove('selectedID');
        setSelectdButton(e.target.value)
        idName = e.target.value + '-btn';
        document.getElementById(idName).classList.add('selectedID');
    }

    return (

        <div className="admin-div">

            <div className="left-pannel">
                <div className="inside-left-pannel">
                    <div className="left-header">
                        <h4>Menus</h4>
                    </div>

                    <div className="left-options">
                        <button className="option-btn selectedID" id="admin-btn" value="admin" onClick={(e)=>handleButtonClick(e)}>Manage Admin</button>
                        <button className="option-btn" id="product-btn" value="product" onClick={(e)=>handleButtonClick(e)}>Manage Product</button>
                        <button className="option-btn" id="employee-btn" value="employee" onClick={(e)=>handleButtonClick(e)}>Manage Employee</button>
                        <button className="option-btn" id="supplier-btn" value="supplier" onClick={(e)=>handleButtonClick(e)}>Manage Supplier</button>
                    </div>
                </div>
            </div>

            <div className="right-pannel">
                {
                    selectedButton === 'admin' ?
                        <ManageAdmin />
                        :
                        selectedButton === 'employee' ?
                            <ManageEmployee />
                            :
                            selectedButton === 'product' ?
                                <ManageProducts />
                                :
                                selectedButton === 'product' ?
                                    <ManageProducts />
                                    :
                                    selectedButton === 'supplier' ?
                                        <ManageSuppliers />
                                        :
                                        <div className="default-Div">
                                            Hello Admin! Click On The Options to manage your Store... 
                                        </div>
                                        


                                
                }
            </div>

        </div>
    );
};

export default AdminPage;