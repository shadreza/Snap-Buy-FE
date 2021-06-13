import React , {useState , useEffect} from 'react';
import axios from 'axios';
import './ManageAdmin.css';

const ManageAdmin = () => {

    const [gotAdminrData , setGotAdminrData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/get/admin").then((response) => {
            setGotAdminrData(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        
        const ID = document.getElementById('ID').value.trim().toLowerCase();
        const firstName = document.getElementById('first_name').value.trim().toLowerCase();
        const lastName = document.getElementById('last_name').value.trim().toLowerCase();
        const mail = document.getElementById('mail').value.trim().toLowerCase();
        const phnNumber = document.getElementById('phoneNumber').value.trim().toLowerCase();
        const houseNo = document.getElementById('houseNo').value.trim().toLowerCase();
        const streetNo = document.getElementById('streetNo').value.trim().toLowerCase();
        const postalCode = document.getElementById('postalCode').value.trim().toLowerCase();

        axios.post("http://localhost:3001/api/insert/admin", {
            id:     ID,
            name:   firstName + ' ' + lastName,
            mail:   mail,
            phone:  phnNumber,
            house:  houseNo,
            street: streetNo,
            postal: postalCode,
        });

    }

    const cancelAdmin = (e) => {
        // the e.target.value will get the email of the admin and this will be deleted from the table.
    }

    return (
        <div className="manageAdmin-main-div">
            <div className="manage-admins-header">
                <h2>Manage Admin</h2>
            </div>
            <div className="current-admins">
                <div className="heading-all-admins">
                    <h3>Connected Admins</h3>
                </div>
                <div className="all-admins">
                    <div className="admin-card">
                        <p>Admin 1</p>
                        <button value="admin.email" onClick={(e)=>cancelAdmin(e)}>Remove Admin</button>
                    </div>
                    <div className="admin-card">
                        <p>Admin 1</p>
                        <button  value="admin.email" onClick={(e)=>cancelAdmin(e)}>Remove Admin</button>
                    </div>
                    <div className="admin-card">
                        <p>Admin 1</p>
                        <button value="admin.email" onClick={(e)=>cancelAdmin(e)}>Remove Admin</button>
                    </div>
                    <div className="admin-card">
                        <p>Admin 1</p>
                        <button value="admin.email" onClick={(e)=>cancelAdmin(e)}>Remove Admin</button>
                    </div>
                    <div className="admin-card">
                        <p>Admin 1</p>
                        <button value="admin.email" onClick={(e)=>cancelAdmin(e)}>Remove Admin</button>
                    </div>
                </div>
            </div>
            <div className="add-another-admin">
                <h3>Add Another Admin</h3>
                <form className="input-form">
                    <div className="row">
                        <div className="input-field">
                            <p>Mail</p>
                            <input id="mail-admin" type="email" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <button id="button-add-admin" type="submit" name="action" onClick={e => handleSubmit(e)}>Add Admin</button>
                </form>
            </div>
        </div>
    );
};

export default ManageAdmin;




const ManageSuppliers = () => {

    

    

    return (
        <div className="manageSuppliers-main-div">
            <div className="manage-suppliers-header">
                <h2>Manage Suppliers</h2>
            </div>
            <div className="current-suppliers">
                
            </div>
            <div className="add-another-suppliers">
                
            </div>
        </div>
    );
};
