import mongoose from "mongoose";
import Users from "./UserSchema.js";

const CartSchema = mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menus',
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
})

const OrdersSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartitems: [CartSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryfees: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in process', 'delivered', 'cancelled'],
    default: 'pending'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Orders = mongoose.model('orders', OrdersSchema)
export default Orders