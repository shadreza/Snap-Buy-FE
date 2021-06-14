import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const AdminPage = () => {

    const [gotSupplierData , setGotSupplierData] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/api/get/supplier").then((response) => {
            setGotSupplierData(response.data);
        });
      }, []);

    // const [supplierInfo , setSupplierInfo] = useState({
    //     supplier_Id :                  '',
    //     supplier_Name :                '',
    //     supplier_Mail :                '',
    //     supplier_Phone_Number :        '',
    //     supplier_Address_House_No :    '',
    //     supplier_Address_Street_No :   '',
    //     supplier_Address_Postal_Code : ''
    // });


    const handleSubmit = (e) => {        
        
        const ID = document.getElementById('ID').value.trim().toLowerCase();
        const firstName = document.getElementById('first_name').value.trim().toLowerCase();
        const lastName = document.getElementById('last_name').value.trim().toLowerCase();
        const mail = document.getElementById('mail').value.trim().toLowerCase();
        const phnNumber = document.getElementById('phoneNumber').value.trim().toLowerCase();
        const houseNo = document.getElementById('houseNo').value.trim().toLowerCase();
        const streetNo = document.getElementById('streetNo').value.trim().toLowerCase();
        const postalCode = document.getElementById('postalCode').value.trim().toLowerCase();

        // setSupplierInfo ({
        //     supplier_Id :                  ID,
        //     supplier_Name :                firstName + ' ' + lastName,
        //     supplier_Mail :                mail,
        //     supplier_Phone_Number :        phnNumber,
        //     supplier_Address_House_No :    houseNo,
        //     supplier_Address_Street_No :   streetNo,
        //     supplier_Address_Postal_Code : postalCode
        // });

        axios.post("http://localhost:3001/api/insert/supplier", {
            id:     ID,
            name:   firstName + ' ' + lastName,
            mail:   mail,
            phone:  phnNumber,
            house:  houseNo,
            street: streetNo,
            postal: postalCode,
            });

        //e.preventDefault();
    }

    return (
        <div className="admin-div">
            <h3>Admin Adds Supplier</h3>
            <br />
            <div className="form-div">
                <div className="row">
                    <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="first_name" type="text" className="validate"/>
                        <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="last_name" type="text" className="validate"/>
                        <label htmlFor="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="ID" type="text" className="validate"/>
                        <label htmlFor="ID">ID</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="mail" type="email" className="validate"/>
                        <label htmlFor="mail">Mail</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="phoneNumber" type="number" className="validate"/>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                        <input id="houseNo" type="text" className="validate"/>
                        <label htmlFor="houseNo">House No</label>
                        </div>
                        <div className="input-field col s4">
                        <input id="streetNo" type="text" className="validate"/>
                        <label htmlFor="streetNo">Street No</label>
                        </div>
                        <div className="input-field col s4">
                        <input id="postalCode" type="text" className="validate"/>
                        <label htmlFor="postalCode">Postal Code</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={e => handleSubmit(e)}>Submit</button>
                    </form>
                </div>
            </div>
            <br />
            <h4>Supplier Data</h4>
            <br />
            <div className="supplier-show">
                {gotSupplierData.map((item) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body className='cards'>
                                <Card.Title>{item.SUPPLIER_NAME}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.SUPPLIER_MAIL}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{item.SUPPLIER_PHONE}</Card.Subtitle>

                                <Card.Text>
                                    {item.SUPPLIER_ADDRESS.HOUSE_NO + ' ' + item.SUPPLIER_ADDRESS.STREET_NO + ' ' + item.SUPPLIER_ADDRESS.POSTAL_CODE}
                                </Card.Text>
                            </Card.Body>
                      </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminPage;