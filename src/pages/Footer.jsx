import React from 'react'
import { assets } from '../assets/assets.js'
import Logo2 from '../components/Logo2.jsx'
import { Col, Row } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <div id="getapp" className='app_download'>
        <p className='section_title app_download_text'>For better experience,download <br />the app now</p>
        <div className='app_links'>
          <img src={assets.google_store} alt="playstore" />
          <img src={assets.app_store2} alt="appstore" />
        </div>
      </div>
      <div>
        <Row className='footer_main' lg={4} md={3} sm={2}>
          <Col className='footer_logo'>
            <Logo2 />
            <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus nobis aliquid quis,
              sapiente minima?</p>
          </Col>
          <Col>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li>Careers</li>
              <li>Become a partner</li>
              <li>Help & Support</li>
            </ul>
          </Col>
          <Col className='contact'>
            <h5>Get in touch</h5>
            <p>1635, Some Block<br></br>some street, some city<br></br>123456</p>
            <p>+91-9167949688</p>
            <p className="email">someid@somedomain.com</p>
            <div className="social">
              <img src={assets.facebook_ico} alt="facebook" />
              <img src={assets.instagram_ico} alt="instagram" />
              <img src={assets.twitter_ico} alt="twitter" />
            </div>

          </Col>
        </Row >
      </div>
    </>
  )
}

export default Footer
