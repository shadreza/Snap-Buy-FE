import React, { useState } from 'react';
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

                <div className="left-header">
                    <h5>Menus</h5>
                </div>

                <div className="left-options">
                    <button className="option-btn selectedID" id="admin-btn" value="admin" onClick={(e)=>handleButtonClick(e)}>Manage Admin</button>
                    <button className="option-btn" id="product-btn" value="product" onClick={(e)=>handleButtonClick(e)}>Manage Product</button>
                    <button className="option-btn" id="employee-btn" value="employee" onClick={(e)=>handleButtonClick(e)}>Manage Employee</button>
                    <button className="option-btn" id="supplier-btn" value="supplier" onClick={(e)=>handleButtonClick(e)}>Manage Supplier</button>
                </div>

            </div>

            <div className="right-pannel">
                
            </div>

        </div>
    );
};

export default AdminPage;