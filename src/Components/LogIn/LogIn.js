import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../FireBase/firebase";
import './LogIn.css';

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const signin = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            history.push("/home");
        })
        .catch((error) => alert(error.message));
    };

    const register = (e) => {
        history.push("/signup");
    };

    return (
            <div className="login__signin">
                <div className="login__box">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <h5>Password</h5>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button
                    type="submit"
                    onClick={signin}
                    className="login__signInButton"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                    Sign In
                    </button>
                </form>
                <button
                    onClick={register}
                    className="login__registerButton"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                    Create New Account
                </button>
                </div>
            </div>
        
    );
};

export default LogIn;