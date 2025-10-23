import React from 'react'
import './Header.css'
import LogoutImage from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'

const Header = ({name}) => {
  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("token");

    return navigate("/login");
  }

  return (
     <div className="header">

        <div className="logo">
          <span className="logo-gray">XERO</span>
          <span className="logo-orange">TODO</span>
        </div>

        <div className="logout">
          <h3>{name}</h3>
          <img 
          src={LogoutImage} 
          alt="logout" 
          onClick={logout}
          />
        </div>
      </div>
  )
}

export default Header
