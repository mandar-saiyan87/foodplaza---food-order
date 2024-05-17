import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../services/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { authSet, addUser } from '../../store/userSlice'
import { testToken } from '../../services/testToken'

function Login({ showModal }) {


  const [phone, setPhone] = useState('')
  const [psubmit, setPsubmit] = useState(false)
  const [otp, setOtp] = useState('')
  const [confirmation, setConfirmation] = useState(null)


  const dispatch = useDispatch()

  function setUser() {
    setPhone('')
    showModal(false)
    dispatch(authSet(testToken))
    dispatch(addUser({ phNum: testToken.phoneNumber }))
  }


  async function getOtp() {
    try {
      setPsubmit(true)
      const phoneNum = phone.trim()
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
      const confirmationOtp = await signInWithPhoneNumber(auth, phoneNum, recaptcha)
      setConfirmation(confirmationOtp)
    } catch (error) {
      console.error(error)
    }
  }

  async function verifyOtp() {
    try {
      const userData = await confirmation.confirm(otp)
      if (userData) {
        const user = userData._tokenResponse
        setPhone('')
        showModal(false)
        dispatch(authSet(user))
        dispatch(addUser({ phNum: user.phoneNumber }))
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div className='login_overlay' onClick={() => showModal(false)}>
        <div className='login_main' onClick={(e) => e.stopPropagation()}>
          <div className='login_heading'>
            <img src={assets.shield} alt="shield" />
            <p>Login</p>
          </div>
          <div className='toggle_div'>
            <div className='form_div_login'>
              <div className='login_form'>
                {/* <input type="text" maxLength={10} onChange={(e) => setPhone(e.target.value)} placeholder='Phone no.' /> */}
                <PhoneInput
                  country={'us'}
                  value={phone}
                  onChange={phone => setPhone("+" + phone)}
                />
                <div id="recaptcha" className='captcha'></div>
                {phone !== '' && psubmit ?
                  <input type="text" maxLength={6} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' value={otp} /> :
                  ''
                }
              </div>
              {phone !== '' && psubmit ?
                <button className='login_button' onClick={verifyOtp}>Verify OTP</button>
                :
                <button className='login_button' onClick={setUser} disabled={phone.length < 4}>GET OTP</button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login


