import React, { useState } from 'react'
import GoogleImage from '../assets/google.svg'
import TwitterImage from '../assets/twitter.svg'
import ShowIcon from '../assets/show.svg'
import HideIcon from '../assets/hide.svg'
import { useForm } from 'react-hook-form';
import './LoginPage.css';
// import LoginSignUp from '../components/LoginSignUp'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);
      console.log("Registration successful!", res.data);
    } catch (err) {
      console.error("Login failed", err);
      console.log(err.response?.data?.message || "Login failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-sign-up-container'>

      <div className='login-container'>
        {/* <LoginSignUp /> */}
        <h2>Welcome!</h2>
        <p>Please enter your details to login</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form"
        >

          <div className="input-email">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && <p>{errors.email.message}</p>}

          <div className="input-password">
            <label htmlFor="password">Password</label>
            <input
              type={isShow ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
            />
            <img src={isShow ? HideIcon : ShowIcon} onClick={() => setIsShow(!isShow)} alt={isShow ? "hide password" : "show password"} className="show-hide" />

          </div>
          {errors.password && <p>{errors.password.message}</p>}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >  {loading ? "Logging..." : "Log In"}</button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>


        <div className="login-other-way">
          <div>
            <img src={GoogleImage} alt="google" />
            <p>Continue with Google</p>
          </div>
          <div>
            <img src={TwitterImage} alt="twitter" />
            <p>Continue with Twitter</p>
          </div>
        </div>
        <p className="login-footer">Don't have an acount yet? <Link to="/register">Sign up</Link></p>
      </div>
      <div className='website-info'></div>
    </div>
  )
}

export default LoginPage
