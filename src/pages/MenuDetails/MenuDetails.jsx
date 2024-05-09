import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { assets } from '../../assets/assets'

const MenuDetails = () => {

  const menuList = useSelector((state) => state.menu.menus)
  const { id } = useParams()

  const [menuItem, setMenuItem] = useState(null)

  useEffect(() => {
    const menuCurrent = menuList.find((item) => item._id === id)
    setMenuItem(menuCurrent)
  }, [menuList, id])

  return (
    <>
      {menuItem ?
        <div className='menu_maindiv'>
          <div className='menu_content'>
            <img src={menuItem.image} alt="menuimage" className='menu_img' />
            <div className='menu_heading'>
              <div className='title_main'>
                <p className='title'>{menuItem.name}</p>
                <div className='rating'>
                  {menuItem.rating ?
                    [...Array(menuItem.rating)].map((_, index) => (
                      <img src={assets.star_yellow} alt="rating" key={index} />
                    )) :
                    [...Array(4)].map((_, index) => (
                      <img src={assets.star_black} alt="rating" key={index} />
                    ))
                  }
                </div>
              </div>
              <div className='prepTime'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="timerimg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <p>{menuItem.prepTime}</p>
              </div>
              <p className='price'>${menuItem.price}</p>
            </div>
            <div className='menu_description'>
              <p dangerouslySetInnerHTML={{ __html: menuItem.description }}></p>
            </div>
          </div>
        </div>
        :
        <div className='loading'>
          <img src={assets.spinner} alt="loading" />
        </div>
      }

    </>
  )
}

export default MenuDetails