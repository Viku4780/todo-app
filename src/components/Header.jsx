import React from 'react'
import './Header.css'
import LogoutImage from '../assets/logout.svg'

const Header = () => {
  return (
     <div className="header">

        <div class="logo">
          <span class="logo-gray">XERO</span>
          <span class="logo-orange">TODO</span>
        </div>

        <div className="logout">
          <img src={LogoutImage} alt="" />
        </div>
      </div>
  )
}

export default Header
