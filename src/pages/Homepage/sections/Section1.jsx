import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { assets } from '../../../assets/assets.js'

function Section1() {

  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        emulateTouch={true}
        showThumbs={false}
      >
        <div className='banner' style={{ backgroundImage: `url(${assets.homepage_banner1})` }}>
          <div className='bg_wrapper'>
            <div className='banner_content'>
              <p className='title'>Order your <br />favourite food here</p>
              <p className='subtitle'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut neque deserunt sapiente molestiae numquam eveniet libero hic et ipsa.
                Rerum aperiam atque obcaecati ducimus? Illo tempora deserunt asperiores aliquam. Incidunt.</p>
              <button className='common_btn'>View Menu</button>
            </div>
          </div>
        </div>
        <div className='banner' style={{ backgroundImage: `url(${assets.homepage_banner2})` }}>
          <div className='bg_wrapper'>
            <div className='banner_content'>
              <p className='title'>Enjoy festival<br />with 50% off</p>
              <p className='subtitle'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut neque deserunt sapiente molestiae numquam eveniet libero hic et ipsa.
                Rerum aperiam atque obcaecati ducimus? Illo tempora deserunt asperiores aliquam. Incidunt.</p>
              <button className='common_btn'>Order Now</button>
            </div>
          </div>
        </div>
        <div className='banner' style={{ backgroundImage: `url(${assets.homepage_banner3})` }}>
          <div className='bg_wrapper'>
            <div className='banner_content'>
              <p className='title'>Free Delivery<br />Claim Now</p>
              <p className='subtitle'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut neque deserunt sapiente molestiae numquam eveniet libero hic et ipsa.
                Rerum aperiam atque obcaecati ducimus? Illo tempora deserunt asperiores aliquam. Incidunt.</p>
              <button className='common_btn'>Order Now</button>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  )
}

export default Section1