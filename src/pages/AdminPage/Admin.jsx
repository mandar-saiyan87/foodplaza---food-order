import React, { useEffect, useState, useRef } from 'react'
import Logo from '../../components/Logo'
import { assets } from '../../assets/assets'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { adminLogout } from '../../store/userSlice'
import { useDispatch } from 'react-redux'


const Admin = () => {

  const currenturl = useLocation()
  const navigate = useNavigate()
  const logoutref = useRef()

  const dispatch = useDispatch()

  const [logoutbtn, setLogoutBtn] = useState(false)

  const adminToken = JSON.parse(localStorage.getItem('adminToken'))

  function closeLogout(e) {
    if (logoutref.current && !logoutref.current.contains(e.target)) {
      setLogoutBtn(false)
    }
  }



  const adminMenu = [
    {
      name: 'Categories',
      route: '/admin/Categories'
    },
    {
      name: 'Menu Items',
      route: '/admin/MenuItems'
    },
    {
      name: 'Add Item',
      route: '/admin/AddItem'
    },
    {
      name: 'Orders',
      route: '/admin/Orders'
    }
  ]

  function logoutAdmin() {
    dispatch(adminLogout())
    navigate('/admin/login')
  }

  useEffect(() => {
    document.addEventListener('click', closeLogout)
    return () => {

      document.removeEventListener('click', closeLogout)
    }
  }, [])


  useEffect(() => {
    if (currenturl.pathname === '/admin') {
      if (adminToken) {
        navigate('/admin/Categories')
      } else {
        navigate('/admin/login')
      }
    }
  }, [currenturl, navigate, adminToken])


  return (
    <>
      <div className='admin_main'>
        <div className='admin_header'>
          <div className='logo_div'>
            <Logo />
            <p className="logo_div_sub">Admin Panel</p>
          </div>
          <div className="profile_pic" ref={logoutref} onClick={() => setLogoutBtn(!logoutbtn)}>
            <img src={assets.profile_icon} alt="profile" />
          </div>
          {logoutbtn &&
            <div className='admin_logout_btn' onClick={logoutAdmin}>
              <p>Logout</p>
            </div>
          }
        </div>
        <div className="admin_menu">
          <div className='admin_menu_tabs'>
            {adminMenu.map((item) => (
              <NavLink to={item.route} key={item.name} className={({ isActive }) =>
                isActive ? "admin_menu_options_active" : "admin_menu_options"
              }>
                <p>{item.name}</p>
              </NavLink>
            ))}
          </div>
          <div className='admin_current_menu'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
