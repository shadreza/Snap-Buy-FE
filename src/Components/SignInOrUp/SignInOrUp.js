import React , {useState} from 'react';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import './SignInOrUp.css';

const SignInOrUp = () => {

    const [logInOrSignUp, setLogInOrSignUp] = useState('login');

    return (
        <div className='signInOrUp-main-div'>
            <div className="credentials-header">
                <div className="left-part-heading">
                    <h3>Name</h3>
                </div>
                <div className="right-part-toggler">

                </div>
            </div>
            <div className="credentials-body">
                {
                    logInOrSignUp === 'login' ? 
                        <LogIn /> 
                        :
                        <SignUp />
                }
            </div>
        </div>
    );
};

export default SignInOrUp;