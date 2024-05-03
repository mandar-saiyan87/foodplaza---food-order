import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { food_list } from '../../../assets/assets.js'
import DishCard from '../../../components/DishCard.jsx';

function Section3() {
  return (
    <>
      <div id="menu" className='section_main'>
        <div className='section_desc'>
          <p className='section_title'>Top dishes near you</p>
        </div>

        <Row xs={1} md={2} lg={3} xl={4} className='card_section'>
          {food_list.map(item => (
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
