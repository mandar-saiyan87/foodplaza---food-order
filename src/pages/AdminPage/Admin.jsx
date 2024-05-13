import React, { useEffect } from 'react'
import Logo from '../../components/Logo'
import { assets } from '../../assets/assets'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const Admin = () => {

  const currenturl = useLocation()
  const navigate = useNavigate()

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

  useEffect(() => {
    if (currenturl.pathname === '/admin') {
      navigate('admin/Categories')
    }
  }, [currenturl])

  return (
    <>
      <div className='admin_main'>
        <div className='admin_header'>
          <div className='logo_div'>
            <Logo />
            <p className="logo_div_sub">Admin Panel</p>
          </div>
          <div className="profile_pic">
            <img src={assets.profile_icon} alt="profile" />
          </div>
        </div>
        <div className="admin_menu">
          <div className='admin_menu_tab'>
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
