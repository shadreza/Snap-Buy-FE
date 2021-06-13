import React from 'react';
import './ManageEmployee.css';

const handleSubmit = () => {
    
}

const removeEmployee = () => {

}

const ManageEmployee = () => {
    return (
        <div className="manageEmployee-main-div">
            <div className="current-employee">
                <div className="manage-employee-header">
                    <h2>Manage Employee</h2>
                </div>
                <div className="current-employee">
                    <div className="heading-all-employee">
                        <h3>Connected Products</h3>
                    </div>
                    <div className="all-employee">
                        <div className="employee-card">
                            <p>Employee 1</p>
                            <button value="employee.email" onClick={(e)=>removeEmployee(e)}>Remove Employee</button>
                        </div>
                        <div className="employee-card">
                            <p>Employee 1</p>
                            <button  value="employee.email" onClick={(e)=>removeEmployee(e)}>Remove Employee</button>
                        </div>
                        <div className="employee-card">
                            <p>Employee 1</p>
                            <button value="employee.email" onClick={(e)=>removeEmployee(e)}>Remove Employee</button>
                        </div>
                        <div className="employee-card">
                            <p>Employee 1</p>
                            <button value="employee.email" onClick={(e)=>removeEmployee(e)}>Remove Employee</button>
                        </div>
                        <div className="employee-card">
                            <p>Employee 1</p>
                            <button value="employee.email" onClick={(e)=>removeEmployee(e)}>Remove Employee</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-another-employee">
                <h3>Add Another Employee</h3>
                <form className="input-form">
                    <div className="row">
                        <div className="input-field">
                            <p>First Name</p>
                            <input placeholder="First Name" id="employeeFirstName" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Last Name</p>
                            <input placeholder="Last Name" id="employeeLastName" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Mail</p>
                            <input placeholder="Mail" id="employeeMail" type="text" className="validate"/>
                            <br /><br />
                        </div>
                        <div className="input-field">
                            <p>Employee ID</p>
                            <input placeholder="Employee ID" id="employeeID" type="text" className="validate"/>
                            <br /><br />
                        </div>
                    </div>
                    <button id="button-add-employee" type="submit" name="action" onClick={e => handleSubmit(e)}>Add Employee</button>
                </form>
            </div>
        </div>
    );
};

export default ManageEmployee;