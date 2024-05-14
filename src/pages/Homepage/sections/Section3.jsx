import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DishCard from '../../../components/DishCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getallmenu } from '../../../store/menuSlice.js';

function Section3() {


  const dispatch = useDispatch()

  const menuItems = useSelector((state) => state.menu.filterMenu.length > 0 ? state.menu.filterMenu : state.menu.menus);

  // console.log(menuItems)

  // const [menuList, setMenuList] = useState(menuItems)

  useEffect(() => {
    dispatch(getallmenu())
  }, [dispatch])

  return (
    <>
      <div id="menu" className='section_main'>
        <div className='section_desc'>
          <p className='section_title'>Top dishes near you</p>
        </div>

        <Row xs={1} md={2} lg={3} xl={4} className='card_section'>
          {menuItems.length > 0 ? menuItems.map(item => (
            <Col key={item._id}>
              <DishCard item={item} />
            </Col>
          )) :
            <div>No Menu items added so far</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Section3
