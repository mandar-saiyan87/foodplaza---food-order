import React, { useState, useRef, useEffect } from 'react'
import Logo from '../components/Logo'
import { assets } from "../assets/assets.js"
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchMenu } from '../store/menuSlice.js'
import { unsetAuth } from '../store/userSlice.js'
import Login from './Login/Login.jsx'


function Navbar() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart.cartItems)

  const isloggedIn = useSelector((state) => state.user.token)
  const isDbUser = useSelector((state) => state.user.dbUser)

  // console.log(isDbUser)

  const searchRef = useRef(null)

  const userOptionsref = useRef()

  const [showSearch, setSearch] = useState(false)

  const [loginModal, setLoginModal] = useState(false)

  const [userOptions, setUserOptions] = useState(false)

  const [searchDish, setSearchDish] = useState('')

  const [mobileDrawer, setMobileDrawer] = useState(false)


  function closeSearch(event) {
    if (searchRef.current &&
      !searchRef.current.contains(event.target) &&
      event.target.tagName.toLowerCase() !== 'input'
    ) {
      setSearch(false)
    }
  }

  function closeUserOptions(e) {
    if (userOptionsref.current && !userOptionsref.current.contains(e.target)) {
      setUserOptions(false)
    }
  }



  function logoutUser() {
    dispatch(unsetAuth())
    navigate('/')
  }

  useEffect(() => {
    document.addEventListener('click', closeUserOptions)
    return () => {

      document.removeEventListener('click', closeUserOptions)
    }
  }, [])


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
    <>
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
          <NavLink to='/cart'>
            <div className='cart_status'>
              {isDbUser && cart.length > 0 ? <div className='cart_added'></div> : null}
              <img src={assets.bag_icon} alt="cart" className='shopping_bag' />
            </div>
          </NavLink>
          {!isloggedIn && !isDbUser ? <button className='sign_in' onClick={() => setLoginModal(true)}>
            Sign In
          </button> :
            <div className='logout' onClick={() => setUserOptions(!userOptions)} ref={userOptionsref}>
              <img src={assets.profile_icon} alt="logout" />
              {
                userOptions &&
                <div className="user_options">
                  <ul>
                    <li>Settings</li>
                    <Link to={`/orderview/${isDbUser._id}`}>
                      <li >Orders</li>
                    </Link>
                    <li onClick={logoutUser}>Logout</li>
                  </ul>
                </div>
              }

            </div>
          }

          {/************* Mobile Menu *************/}

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mobile_menu" onClick={() => setMobileDrawer(true)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        {mobileDrawer &&
          <div className={`overlay ${mobileDrawer && 'overlay-show'}`} onClick={() => setMobileDrawer(false)}>
            <div className={`mobile_menu-drawer ${mobileDrawer && 'drawer_open'}`}>
              <div className="mobile_menu_header">
                <Logo />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mobile_menu_close" onClick={() => setMobileDrawer(false)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div className='mobile_menu'>
                <ul>
                  {navmenu.map(menuitem => (
                    <NavLink to={menuitem.href} key={menuitem.name} className={({ isActive }) =>
                      isActive ? "mobile_menu_item_active" : "mobile_menu_item"}>
                      <li>{menuitem.name}</li>
                    </NavLink>
                  ))}
                </ul>
              </div>
              {!isloggedIn && !isDbUser ? <button className='mobile_sign_in' onClick={() => setLoginModal(true)}>
                Sign In
              </button> :
                <div className='mobile_logout' onClick={logoutUser}>
                  <img src={assets.logout_icon} alt="logout" />
                </div>}

            </div>
          </div>
        }
        {/* <Alerts message="Please login to add products" status="Warning" /> */}
      </div >
      {loginModal && <Login showModal={setLoginModal} />}


    </>
  )
}

export default Navbar