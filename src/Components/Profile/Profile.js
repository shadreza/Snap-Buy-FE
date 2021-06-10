import React , {useState , useContext} from 'react';
import './Profile.css';
import {UserContext} from '../../App';
import SignInOrUp from '../SignInOrUp/SignInOrUp';
import AdminPage from '../AdminPage/AdminPage';
import Employee from '../Employee/Employee';
import Customer from '../Customer/Customer';

const Profile = () => {
    const user = useContext(UserContext);
    return (
        <div className='profile-div'>
            {
                user[0].isLoggedIn === false ? 
                    <SignInOrUp /> 
                    : 
                    user[0].position === 'admin' ? 
                        <AdminPage /> 
                        :
                        user[0].position === 'employee' ?
                            <Employee /> 
                            :
                            <Customer />
            }
        </div>
    );
};

export default Profile;