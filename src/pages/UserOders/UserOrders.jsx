import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getordersCurrentUser } from '../../store/cartSlice';
import UserOrderCard from '../../components/UserOrderCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function UserOrders() {

  const { userid } = useParams()
  const dispatch = useDispatch()

  const allOrders = useSelector((state) => state.cart.orders)

  // console.log(allOrders)
  let usercurrentPage = useSelector((state) => state.cart.userpage)
  const usertotalPages = useSelector((state) => state.cart.usertotalPages)
  const usertotalOrderItems = useSelector((state) => state.cart.usertotalOrderItems)

  useEffect(() => {
    dispatch(getordersCurrentUser({ userid, usercurrentPage }))
  }, [dispatch])

  function fetchMoreOrders() {
    usercurrentPage = usercurrentPage + 1
    if (usercurrentPage < usertotalPages) {
      dispatch(getordersCurrentUser({ userid, usercurrentPage }))
    }
  }

  return (
    <>
      <Container>
        <div className='user_orders_main'>

        </div>
        <InfiniteScroll
          dataLength={allOrders.length}
          next={fetchMoreOrders}
          hasMore={usercurrentPage < usertotalPages}
          loader={<h4>Loading...</h4>}
          style={{ overflowY: 'hidden' }}
        >
          {allOrders.length > 0 ?
            <div>
              <p className='order_page_title'>Your Order history</p>
              {allOrders.map((order) => (
                <UserOrderCard order={order} key={order._id} />
              ))}
            </div> :
            <div className='no_order'>You haven't placed any order yet</div>
          }
        </InfiniteScroll>


      </Container>
    </>
  )
}

export default UserOrders