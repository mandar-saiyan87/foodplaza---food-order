import React, { useState, useRef, useEffect } from 'react'
import Logo from '../components/Logo'
import { assets } from "../assets/assets.js"
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchMenu } from '../store/menuSlice.js'

function Navbar() {

  const [showSearch, setSearch] = useState(false)
  const searchRef = useRef(null)

  const dispatch = useDispatch()

  const [searchDish, setSearchDish] = useState('')


  function closeSearch(event) {
    if (searchRef.current &&
      !searchRef.current.contains(event.target) &&
      event.target.tagName.toLowerCase() !== 'input'
    ) {
      setSearch(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeSearch);
    return () => {
      document.removeEventListener('click', closeSearch);
    }
  })

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

  useEffect(() => {
    dispatch(searchMenu(searchDish))
  }, [searchDish])

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
        <div onClick={(e) => setSearch(!showSearch)} ref={searchRef}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="search_svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        {/* <img src={assets.search_icon} alt="search" className='search_ico' /> */}
        {showSearch && <div className='search_bar'>
          <input type="text" onChange={(e) => setSearchDish(e.target.value)} value={searchDish} />
          <div onClick={() => setSearch(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="search_svg_2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>}
        <img src={assets.bag_icon} alt="cart" className='shopping_bag' />
        <button className='sign_in'>
          Sign In
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mobile_menu">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <div className='mobile_menu-drawer'>

      </div>
    </div >
  )
}

export default Navbar