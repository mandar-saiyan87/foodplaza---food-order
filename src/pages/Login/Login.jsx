import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSet, addUser } from "../../store/userSlice";
import { SignIn, useUser } from "@clerk/clerk-react";

function Login({ showModal }) {
  const { isSignedIn, user } = useUser();

  const dispatch = useDispatch();

  return (
    <>
      <div className="login_overlay" onClick={() => showModal(false)}>
        <div className="login_main" onClick={(e) => e.stopPropagation()}>
          {!user && <SignIn />}
        </div>
      </div>
    </>
  );
}

export default Login;

{
  /* <div className='login_heading'>
            <img src={assets.shield} alt="shield" />
            <p>Login</p>
          </div> */
}
// <div className='toggle_div'>
//   <div className='form_div_login'>
//     <div className='login_form'>
//       <input type="text" maxLength={10} onChange={(e) => setPhone(e.target.value)} placeholder='Phone no.' />
//       <PhoneInput
//         country={'in'}
//         onlyCountries={['in']}
//         value={phone}
//         onChange={phone => setPhone("+" + phone)}
//       />
//       <div id="recaptcha" className='captcha'></div>
//       {phone !== '' && psubmit ?
//         <input type="text" maxLength={6} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' value={otp} /> :
//         ''
//       }
//     </div>
//     {phone !== '' && psubmit ?
//       <button className='login_button' onClick={verifyOtp}>Verify OTP</button>
//       :
//       <button className='login_button' onClick={getOtp} disabled={phone.length < 4}>GET OTP</button>
//     }
//   </div>
// </div>
