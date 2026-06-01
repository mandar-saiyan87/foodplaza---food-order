import React, { useState, useEffect } from "react";
import { useSocket } from "../AppContext/SocketContext"

function UserOrderCard({ order }) {

  const [status, setStatus] = useState(order.status)

  const socket = useSocket()

  useEffect(() => {
    // Join the room for this specific order to receive updates
    socket.emit('join-order', `order-${order._id}`)

    // Listen for order status updates
    socket.on("order-updated", (updatedOrder) => {
      // console.log(`Order ${order._id} status updated to: ${newStatus}`);
      if (updatedOrder.orderid === order._id) {

        setStatus(updatedOrder.status)
      }
    })
    // Cleanup: leave room and remove listener when component unmounts
    return () => {
      socket.off('order-updated');
      socket.emit('leave-room', `order-${order._id}`);
    }

  }, [socket, order._id])

  // console.log(order);
  return (
    <div className="userorder_card" key={order._id}>
      <div className="userorder_heading">
        <div className="userorder_owner">
          <p className="name">{order.name}</p>
          <p className="contact">{order.phno}</p>
          <p className="address">{order.address}</p>
        </div>
        <div className="userorder_status">
          <p
            style={
              status === "delivered"
                ? { color: "green" }
                : { color: "rgb(242, 125, 36)" }
            }
          >
            {status}
          </p>
        </div>
      </div>
      <hr />
      <div>
        {order.cartitems.map((item) => (
          <div className="userorder_items">
            <p className="item_name">{item.menuItem.title}</p>
            <p className="item_qty">x {item.qty}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="userorder_footer">
        <div className="userfinal_total">
          <p>Delivery Charges: ${order.deliveryfees}</p>
          <p>Total Amount: ${order.totalAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default UserOrderCard;
