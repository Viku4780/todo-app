import React, { useState } from 'react'
// import LoginSignUp from '../components/LoginSignUp'
import './SignUpPage.css'
import { useForm } from 'react-hook-form'
import ShowIcon from '../assets/show.svg'
import HideIcon from '../assets/hide.svg'
import GoogleImage from '../assets/google.svg'
import TwitterImage from '../assets/twitter.svg'
import { Link } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../validations/validationSchema'
import axios from 'axios'

const SignUpPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/register", data);
      console.log("Registration successful!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='login-sign-up-container'>
      <div className='sign-up-container'>
        {/* <LoginSignUp /> */}

        <h2>Create an Account</h2>
        <p className="login-para">Already Have An Account? <Link to="/login">Sign In</Link></p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form"
        >
          <div className='input-name'>
            <input
              type="text"
              {...register("name")}
              placeholder='Enter your name'
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className='input-lastName'>
            <input
              type={isConfirm ? "text" : "password"}
              placeholder='Last Name'
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div className="input-email">
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="input-password">
            <input
              type={isShow ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <img src={isShow ? HideIcon : ShowIcon} onClick={() => setIsShow(!isShow)} alt={isShow ? "hide password" : "show password"} className="show-hide" />

            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >  {loading ? "Registering..." : "Register"}</button>
        </form>

        <div className="divider">
          <span>OR Register With</span>
        </div>

        <div className="sign-up-other-way">

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

export default SignUpPage
