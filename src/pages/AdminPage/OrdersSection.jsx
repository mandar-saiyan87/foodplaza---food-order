import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../../store/cartSlice'
import OrderDetailsCard from '../../components/OrderDetailsCard'

const OrdersSection = () => {

  const dispatch = useDispatch()
  const allOrders = useSelector((state) => state.cart.orders)


  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch, allOrders])

  return (
    <>
      <div className='admin_order_details_main'>
        {allOrders.map((order) => (
          <OrderDetailsCard order={order} />
        ))}
      </div>
    </>
  )
}

export default OrdersSection
