import React, { useState } from 'react'
import GoogleImage from '../assets/google.svg'
import TwitterImage from '../assets/twitter.svg'
import ShowIcon from '../assets/show.svg'
import HideIcon from '../assets/hide.svg'
import { useForm } from 'react-hook-form';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", data);
      localStorage.setItem("token", res.data.token);
      console.log("login successful!", res.data);
      navigate("/");
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

        <h2>Welcome!</h2>
        <p className="signUp-para">Don't have an acount yet? <Link to="/register">Sign up</Link></p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form"
        >

          <div className="input-email">
            {/* <label htmlFor="email">Email address</label> */}
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email address"
            />
          {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="input-password">
            {/* <label htmlFor="password">Password</label> */}
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

          {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >  {loading ? "Logging..." : "Log In"}</button>
        </form>

        <div className="divider">
          <div className="line"></div>
          <span>OR</span>
        </div>


        <div className="login-other-way">
          <div>
            <img src={GoogleImage} alt="google" />
            <p>Google</p>
          </div>
          <div>
            <img src={TwitterImage} alt="twitter" />
            <p>Twitter</p>
          </div>
        </div>
        
      </div>
      <div className='website-info'></div>
    </div>
  )
}

export default LoginPage
