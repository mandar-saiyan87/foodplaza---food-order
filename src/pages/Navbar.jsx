import React from 'react'
import Logo from '../components/Logo'
import { assets } from "../assets/assets.js"

function Navbar() {

  const navmenu = [
    {
      name: 'Menu',
      href: '#menu'
    },
    {
      name: 'About',
      href: '#'
    },
    {
      name: 'Get App',
      href: '#getapp'
    }
  ]

  return (
    <div className='nav_main'>
      <Logo />
      <ul className='nav_menu'>
        {navmenu.map((menu) => (
          <a href={menu.href} key={menu.name}>
            <li className='nav_menu'>{menu.name}</li>
          </a>

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