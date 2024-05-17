import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getordersCurrentUser } from '../../store/cartSlice';
import UserOrderCard from '../../components/UserOrderCard';

function UserOrders() {

  const { userid } = useParams()
  const dispatch = useDispatch()

  const allOrders = useSelector((state) => state.cart.orders)

  console.log(allOrders)

  useEffect(() => {
    dispatch(getordersCurrentUser(userid))
  }, [dispatch, allOrders])

  return (
    <>
      <Container>
        <div className='user_orders_main'>

        </div>
        {allOrders.length > 0 ?
          <div>
            <p className='order_page_title'>Your Order history</p>
            {allOrders.map((order) => (
              <UserOrderCard order={order} />
            ))}
          </div> :
          <div className='no_order'>You haven't placed any order yet</div>
        }

      </Container>
    </>
  )
}

export default UserOrders