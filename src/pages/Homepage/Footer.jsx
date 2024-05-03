import React from 'react'
import { assets } from '../../assets/assets.js'
import Logo2 from '../../components/Logo2'
import { Col, Row } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <div className='app_download'>
        <p className='section_title app_download_text'>For better experience,download <br />the app now</p>
        <div className='app_links'>
          <img src={assets.google_store} alt="playstore" />
          <img src={assets.app_store2} alt="appstore" />
        </div>
      </div>

        <div className='footer_main'>
          <div className='footer_logo'>
            <Logo2 />
            <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus nobis aliquid quis,
              sapiente minima?</p>
          </div>
          <div>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Careers</li>
              <li>Become a partner</li>
              <li>Help & Support</li>
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <p>1635, Some Block<br></br>some street, some city<br></br>123456</p>
            <p>+91-9167949688</p>
            <p class="email">someid@somedomain.com</p>
            <div class="social">
              <img src={assets.facebook_ico} alt="facebook" />
              <img src={assets.instagram_ico} alt="instagram" />
              <img src={assets.twitter_ico} alt="twitter" />
            </div>
          </div>
        </div >
    </>
  )
}

export default Footer
