import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {

    const [selectedButton , setSelectdButton] = useState('admin')

    return (

        <div className="admin-div">

            <div className="left-pannel">

                <div className="left-header">
                    <h5>Menus</h5>
                </div>

                <div className="left-options">
                    <button className="option-btn" id="admin-btn" value="admin">Manage Admin</button>
                    <button className="option-btn" id="product-btn" value="product">Manage Product</button>
                    <button className="option-btn" id="employee-btn" value="employee">Manage Employee</button>
                    <button className="option-btn" id="supplier-btn" value="supplier">Manage Supplier</button>
                </div>
                
            </div>

            <div className="right-pannel">

            </div>

        </div>
    );
};

export default AdminPage;