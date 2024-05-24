import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DishCard from '../../../components/DishCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getallmenu } from '../../../store/menuSlice.js';
import InfiniteScroll from 'react-infinite-scroll-component';

function Section3() {


  const dispatch = useDispatch()

  const menuItems = useSelector((state) => state.menu.filterMenu.length > 0 ? state.menu.filterMenu : state.menu.menus);


  const currentPage = useSelector((state) => state.menu.page)
  const totalPages = useSelector((state) => state.menu.totalPages)
  const totalMenuItems = useSelector((state) => state.menu.totalmenuItems)


  // console.log(menuItems)

  // const [menuList, setMenuList] = useState(menuItems)

  useEffect(() => {
    if (menuItems.length === 0) {
      dispatch(getallmenu(currentPage))
    }
  }, [])


  function fetchMoreMenu() {
    if (currentPage < totalPages) {
      dispatch(getallmenu(currentPage + 1))
    }
  }

  return (
    <>
      <div id="menu" className='section_main'>
        <div className='section_desc'>
          <p className='section_title'>Top dishes near you</p>
        </div>
        <InfiniteScroll
          dataLength={menuItems.length}
          next={fetchMoreMenu}
          hasMore={currentPage < totalPages}
          loader={<h4>Loading...</h4>}
          style={{ overflowY: 'hidden' }}
        >
          <Row xs={1} md={2} lg={3} xl={4} className='card_section'>
            {menuItems.length > 0 ? menuItems.map(item => (
              <Col key={item._id}>
                <DishCard item={item} />
              </Col>
            )) :
              <div>No Menu items added so far</div>
            }
          </Row>
        </InfiniteScroll>


      </div>
    </>
  )
}

export default Section3
