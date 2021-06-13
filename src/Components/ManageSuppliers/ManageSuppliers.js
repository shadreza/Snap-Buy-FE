import React , {useState , useEffect} from 'react';
import axios from 'axios';
import './ManageSuppliers.css';

const ManageSuppliers = () => {

    const [gotSupplierData , setGotSupplierData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/get/supplier").then((response) => {
            setGotSupplierData(response.data);
        });
    }, []);

    const cancelSupplier = (e) => {
        // the e.target.value will get the id of the supplier and this will be deleted from the table.
    }

    const handleSubmit = (e) => {
        
        const ID = document.getElementById('ID').value.trim().toLowerCase();
        const firstName = document.getElementById('first_name').value.trim().toLowerCase();
        const lastName = document.getElementById('last_name').value.trim().toLowerCase();
        const mail = document.getElementById('mail').value.trim().toLowerCase();
        const phnNumber = document.getElementById('phoneNumber').value.trim().toLowerCase();
        const houseNo = document.getElementById('houseNo').value.trim().toLowerCase();
        const streetNo = document.getElementById('streetNo').value.trim().toLowerCase();
        const postalCode = document.getElementById('postalCode').value.trim().toLowerCase();

        axios.post("http://localhost:3001/api/insert/supplier", {
            id:     ID,
            name:   firstName + ' ' + lastName,
            mail:   mail,
            phone:  phnNumber,
            house:  houseNo,
            street: streetNo,
            postal: postalCode,
            });

    }

    return (
        <div className="manageSuppliers-main-div">
            <div className="manage-suppliers-header">
                <h2>Manage Suppliers</h2>
            </div>
            <div className="current-suppliers">
                <div className="heading-all-suppliers">
                    <h3>Connected Suppliers</h3>
                </div>
                <div className="all-suppliers">
                    <div className="supplier-card">
                        <p>Supplier 1</p>
                        <button value="suppleir.id" onClick={(e)=>cancelSupplier(e)}>Cancel Supplier</button>
                    </div>
                    <div className="supplier-card">
                        <p>Supplier 1</p>
                        <button  value="suppleir.id" onClick={(e)=>cancelSupplier(e)}>Cancel Supplier</button>
                    </div>
                    <div className="supplier-card">
                        <p>Supplier 1</p>
                        <button value="suppleir.id" onClick={(e)=>cancelSupplier(e)}>Cancel Supplier</button>
                    </div>
                    <div className="supplier-card">
                        <p>Supplier 1</p>
                        <button value="suppleir.id" onClick={(e)=>cancelSupplier(e)}>Cancel Supplier</button>
                    </div>
                    <div className="supplier-card">
                        <p>Supplier 1</p>
                        <button value="suppleir.id" onClick={(e)=>cancelSupplier(e)}>Cancel Supplier</button>
                    </div>
                </div>
            </div>
            <div className="add-another-suppliers">
                <h3>Add Another Supplier</h3>
                <form className="input-form">
                    <div className="row">
                        <div className="input-field">
                            <p>First Name</p>
                            <input placeholder="First Name" id="first_name" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Last Name</p>
                            <input placeholder="Last Name" id="last_name" type="text" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <p>ID</p>
                            <input id="ID" type="text" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <p>Mail</p>
                            <input id="mail" type="email" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <p>Phone Number</p>
                            <input id="phoneNumber" type="number" className="validate"/>                       
                            <br /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <p>House No</p>
                            <input placeholder="House No" id="houseNo" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Street No</p>
                            <input placeholder="Street No" id="streetNo" type="text" className="validate"/>
                            <br /><br />
                         </div>
                        <div className="input-field">
                            <p>Postal Code</p>
                            <input placeholder="Postal Code" id="postalCode" type="text" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <button id="button-add-supplier" type="submit" name="action" onClick={e => handleSubmit(e)}>Add Supplier</button>
                </form>
            </div>
        </div>
    );
};

export default ManageSuppliers;