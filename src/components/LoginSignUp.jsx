import React from 'react'
import LoginImage from '../assets/login.svg';
import SignUpImage from '../assets/sign-up.svg'
import './LoginSignUp.css'
import { Link } from 'react-router-dom';

const LoginSignUp = () => {
    return (
        <div className="login-sign-up">
            <span className="login">
                <Link to="/api/login"> <img src={LoginImage} alt="login" /> <p>Login</p></Link>
            </span>
            <span className="sign-up">
                <Link to="/api/register"> <img src={SignUpImage} alt="sign-up" /> <p>Sign Up</p></Link>
            </span>
        </div>
    )
}

export default LoginSignUp
