import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../../store/cartSlice'
import OrderDetailsCard from '../../components/OrderDetailsCard'
import InfiniteScroll from 'react-infinite-scroll-component';

const OrdersSection = () => {

  const dispatch = useDispatch()
  const allOrders = useSelector((state) => state.cart.adminOrders)

  const currentPage = useSelector((state) => state.cart.page)
  const totalPages = useSelector((state) => state.cart.totalPages)
  const totalOrderItems = useSelector((state) => state.cart.totalOrderItems)


  useEffect(() => {
    if (allOrders?.length === 0) {
      dispatch(getOrders(currentPage))
    }
  }, [dispatch])

  function fetchMoreOrders() {
    if (currentPage < totalPages) {
      dispatch(getOrders(currentPage + 1))
    }
  }

  return (
    <>
      <div className='admin_order_details_main'>
        <InfiniteScroll
          dataLength={allOrders?.length}
          next={fetchMoreOrders}
          hasMore={currentPage < totalPages}
          loader={<h4>Loading...</h4>}
          style={{ overflowY: 'hidden' }}
        >
          {allOrders?.map((order) => (
            <OrderDetailsCard order={order} key={order._id} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default OrdersSection
