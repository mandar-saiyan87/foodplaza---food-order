import React from 'react'
import Logo from '../components/Logo'
import { assets } from "../assets/assets.js"
import { NavLink } from 'react-router-dom'

function Navbar() {

  const navmenu = [
    {
      name: 'Menu',
      href: '/'
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Contact',
      href: '/contact'
    },
  ]

  return (
    <div className='nav_main'>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <ul className='nav_menu'>
        {navmenu.map((menu) => (
          <NavLink to={menu.href} key={menu.name} className={({ isActive }) =>
            isActive ? "nav_menu_item_active" : "nav_menu_item"}>
            <li>{menu.name}</li>
          </NavLink>
        ))}
      </ul>

      <div className='nav-end'>
        <img src={assets.search_icon} alt="search" className='search_ico' />
        <img src={assets.bag_icon} alt="cart" className='shopping_bag' />
        <button className='sign_in'>
          Sign In
        </button>
      </div>

    </div>
  )
}

export default Navbar