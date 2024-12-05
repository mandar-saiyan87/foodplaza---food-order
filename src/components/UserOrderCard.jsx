import React from 'react'

function UserOrderCard({ order }) {
  return (
    <div key={order._id} className="userorder_card">
      <div className='userorder_heading'>
        <div className='userorder_owner'>
          <p className='name'>{order.name}</p>
          <p className='contact'>{order.phno}</p>
          <p className='address'>{order.address}</p>
        </div>
        <div className='userorder_status'>
          <p style={order.status === 'delivered' ? { color: 'green' } : { color: 'rgb(242, 125, 36)' }}>{order.status}</p>
        </div>
      </div>
      <hr />
      <div>
        {order.cartitems.map((item) => (
          <div className='userorder_items'>
            <p className='item_name'>{item.menuItem.title}</p>
            <p className='item_qty'>x {item.qty}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className='userorder_footer'>
        <div className='userfinal_total'>
          <p>Delivery Charges: ${order.deliveryfees}</p>
          <p>Total Amount: ${order.totalAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default UserOrderCard
