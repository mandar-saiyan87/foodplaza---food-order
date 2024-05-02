import React from 'react'
import Logo from '../components/Logo'
import { assets } from "../assets/assets.js"

function Navbar() {

  const navmenu = ['Menu', 'About', 'Get App']

  return (
    <div className='nav_main'>
      <Logo />
      <ul className='nav_menu'>
        {navmenu.map((menu, index) => (
          <li key={index} className='nav_menu'>{menu}</li>
        ))}
      </ul>

      <div className='nav-end'>
        <img src={assets.search_icon} alt="search" className='search_ico' />

        <button className='sign_in'>
          Sign In
        </button>
      </div>

    </div>
  )
}

export default Navbar