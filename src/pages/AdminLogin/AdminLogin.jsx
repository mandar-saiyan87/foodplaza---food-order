import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { adminlogin, clearLoginStatus } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alerts from '../../components/Alerts'

function AdminLogin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [alertmsgs, setAlertMsgs] = useState(null)

  const [showAlert, setShowAlert] = useState(false)

  const navigate = useNavigate()

  const loginStatus = useSelector((state) => state.user.loginstatus)
  const dispatch = useDispatch()


  function handleadminLogin() {
    dispatch(adminlogin({ username, password }))
    setUsername('')
    setPassword('')
  }

  function manageAlerts() {
    if (loginStatus?.status) {
      setAlertMsgs(loginStatus)
      setShowAlert(true)
    }
  }

  useEffect(() => {
    if (loginStatus?.isAdmin && loginStatus?.token) {
      navigate('/admin/Categories')
    }
  }, [loginStatus, navigate])

  useEffect(() => {
    manageAlerts()
    const alerttimer = setTimeout(() => {
      dispatch(clearLoginStatus())
      setShowAlert(false)
    }, 2000);
    return () => clearTimeout(alerttimer)
  }, [loginStatus, dispatch])

  return (
    <>
      <div className='adminlogin_main'>
        <div className='adminlogin_block'>
          <div className='login_heading'>
            <img src={assets.shield} alt="shield" />
            <p>Admin Login</p>
          </div>
          <div className='adminlogin_inputs'>
            <input type="text" placeholder='admin user....' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='admin password....' onChange={(e) => setPassword(e.target.value)} />
            <button className='login_button' onClick={handleadminLogin}>Login</button>
          </div>
        </div>
      </div>
      {showAlert &&
        <Alerts status={alertmsgs?.status} message={alertmsgs?.message} />
      }
    </>
  )
}

export default AdminLogin