import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSet, addUser } from "../../store/userSlice";
import { signInWithGooglePopup } from "../../firebase";
import { assets } from "../../assets/assets";

function Login({ showModal }) {
  const dispatch = useDispatch();

  async function loginGoogleUser() {
    const res = await signInWithGooglePopup();
    try {
      showModal(false);
      dispatch(
        addUser({
          useremail: res.user.email,
          displayname: res.user.displayName,
          accToken: res.user.accessToken,
        })
      );
      authSet({
        useremail: res.user.email,
        displayname: res.user.displayName,
        accToken: res.user.accessToken,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="login_overlay" onClick={() => showModal(false)}>
        <div className="login_main" onClick={(e) => e.stopPropagation()}>
          <button className="googlesignin" onClick={loginGoogleUser}>
            <div className="imgdiv">
              <img src={assets.googlelogin} alt="googlelogin" />
            </div>
            <p>Sign in with Google</p>
          </button>
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
