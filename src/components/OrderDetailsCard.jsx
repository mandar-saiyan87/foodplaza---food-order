import React, { useState } from 'react'

function OrderDetailsCard({ order }) {

  const [orderStatus, setOrderStatus] = useState(order.status)

  return (
    <div key={order._id} className="order_card">
      <div className='order_heading'>
        <div className='order_owner'>
          <p className='name'>{order.name}</p>
          <p className='contact'>{order.phno}</p>
          <p className='address'>{order.address}</p>
        </div>
        <div className='order_status'>
          <p style={order.status === 'delivered' ? { color: 'green' } : { color: 'rgb(242, 125, 36)' }}>{order.status}</p>
        </div>
      </div>
      <hr />
      <div>
        {order.cartitems.map((item) => (
          <div className='order_items'>
            <p className='item_name'>{item.menuItem.title}</p>
            <p className='item_qty'>x {item.qty}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className='order_footer'>
        <div className='final_total'>
          <p>Delivery Charges: {order.deliveryfees}</p>
          <p>Total Amount: {order.totalAmount}</p>
        </div>
        <div className='order_set_status'>
          <p>Status</p>
          <select select name="status" id="status" onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
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
