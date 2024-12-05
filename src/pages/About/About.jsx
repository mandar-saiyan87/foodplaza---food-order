import React from 'react'
import { assets } from '../../assets/assets.js'

function About() {
  return (
    <>
      <div className='about_main'>
        <img src={assets.delivery} alt="delivery" />
        <div className='heading'>
          <p className='p1'>About FoodPlaza</p>
          <p className='p2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quo sunt voluptatum nesciunt eligendi in quidem necessitatibus possimus perspiciatis officia.</p>
        </div>
        <img src={assets.instamart} alt="instamart" />
      </div>
      <div>
        <div className='about_div'>
          <img src={assets.about1} alt="about1" />
          <div>
            <h4>Mission</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint esse delectus, a blanditiis cum, quam inventore suscipit quaerat, illum obcaecati nesciunt? Dolorem omnis necessitatibus beatae veritatis quaerat atque, modi molestiae?</p>
          </div>
        </div>
        <div className='about_div'>
          <div>
            <h4>Industry Pioneer</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus tenetur incidunt eos pariatur nam distinctio porro dicta repellat nesciunt nobis? Cum voluptatibus fugiat quaerat libero aut voluptatem quod molestias non?</p>
          </div>
          <img src={assets.about2} alt="about2" />
        </div>
      </div>
    </>
  )
}

export default About