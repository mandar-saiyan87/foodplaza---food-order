import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateOrders } from '../store/cartSlice'

function OrderDetailsCard({ order }) {

  console.log(order)

  const dispatch = useDispatch()

  const [orderStatus, setOrderStatus] = useState(order.status)

  function updateOrderStatus(e) {
    const status = e.target.value;
    setOrderStatus(status)

    const updatedOrder = {
      ...order,
      status: status
    }

    dispatch(updateOrders(updatedOrder))
  }


  return (
    <div key={order._id} className="order_card">
      <div className='order_heading'>
        <div className='order_owner'>
          <p className='name'>{order.name}</p>
          <p className='contact'>{order.phno}</p>
          <p className='address'>{order.address}</p>
        </div>
        <div className='order_status'>
          <p style={orderStatus === 'delivered' ? { color: 'green' } : { color: 'rgb(242, 125, 36)' }}>{orderStatus}</p>
        </div>
      </div>
      <hr />
      <div>
        {order.cartitems.map((item) => (
          <div className='order_items' key={item._id}>
            <p className='item_name'>{item.menuItem.title}</p>
            <p className='item_qty'>x {item.qty}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className='order_footer'>
        <div className='final_total'>
          <p>Delivery Charges: ${order.deliveryfees}</p>
          <p>Total Amount: ${order.totalAmount}</p>
        </div>
        <div className='order_set_status'>
          <p>Status</p>
          <select select name="status" id="status" onChange={(e) => updateOrderStatus(e)} value={orderStatus}>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="in process">in process</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsCard



