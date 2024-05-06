import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DishCard from '../../../components/DishCard.jsx';
import { useSelector } from 'react-redux';

function Section3() {

  const menuItems = useSelector((state) => state.menu.filterMenu.length > 0 ? state.menu.filterMenu : state.menu.menus);

  const [menuList, setMenuList] = useState(menuItems)

  useEffect(() => {
    setMenuList(menuItems)
  }, [menuItems])

  return (
    <>
      <div id="menu" className='section_main'>
        <div className='section_desc'>
          <p className='section_title'>Top dishes near you</p>
        </div>

        <Row xs={1} md={2} lg={3} xl={4} className='card_section'>
          {menuList.map(item => (
            <Col key={item._id}>
              <DishCard item={item} />
            </Col>
          ))
          }
        </Row>
      </div>
    </>
  )
}

export default Section3
