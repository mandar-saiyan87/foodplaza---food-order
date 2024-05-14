import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getallmenu, deletemenu } from '../../store/menuSlice'
import { assets } from '../../assets/assets'

const MenuItemSection = () => {

  const allMenu = useSelector((state) => state.menu.menus)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getallmenu())
  }, [dispatch])

  function deletemenuItem(id) {
    dispatch(deletemenu(id))
  }


  return (
    <>
      <div className='menuitems_main'>
        {allMenu.length > 0 ?
          <>
            {
              allMenu.map((item) => (
                <div className="menuitem_card" key={item._id}>
                  <div className='menuitem_title'>
                    <img src={item.image} alt={item.title} />
                    <p>{item.title}</p>
                  </div>
                  <p>${item.price}</p>
                  <div className='rating'>
                    {item.ratings ? [...Array(item.ratings)].map((_, index) => (
                      <img src={assets.star_yellow} alt="rating" key={index} />
                    )) : [...Array(4)].map((_, index) => (
                      <img src={assets.star_black} alt="rating" key={index} />
                    ))}
                  </div>
                  <div className='ico_div'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="delete_ico" onClick={() => deletemenuItem(item._id)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit_ico">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </div>
                </div>
              ))}
          </>
          :
          <div>No menu item added</div>
        }
      </div>
    </>
  )
}

export default MenuItemSection