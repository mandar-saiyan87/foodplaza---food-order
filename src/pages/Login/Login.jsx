import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Login({ showModal }) {


  const [phone, setPhone] = useState('')
  const [psubmit, setPsubmit] = useState(false)


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
                {phone !== '' && psubmit ?
                  <input type="text" maxLength={6} onChange={() => { }} placeholder='Enter OTP' /> :
                  ''
                }
              </div>
              {phone !== '' && psubmit ?
                <button className='login_button'>Verify OTP</button> :
                <button className='login_button' onClick={() => setPsubmit(true)} disabled={phone.length < 4}>GET OTP</button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login