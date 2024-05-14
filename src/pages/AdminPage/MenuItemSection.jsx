import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getallmenu } from '../../store/menuSlice'

const MenuItemSection = () => {

  const allMenu = useSelector((state) => state.menu.menus)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getallmenu())
  }, [dispatch])


  return (
    <>
      <div className='menuitems_main'>
        {allMenu.length > 0 ?
          <div>All menu Here</div> :
          <div>No menu item added</div>
        }
      </div>
    </>
  )
}

export default MenuItemSection