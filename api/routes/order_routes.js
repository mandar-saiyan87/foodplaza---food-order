import express from "express";
import Orders from "../models/Orders.js";

const router = express.Router()




router.post('', async (req, res) => {
  const { cartItems, delivery, finalAmount, userPhone } = req.body
  try {
    const newOrder = await new Orders({
      user: userPhone,
      totalAmount: finalAmount,
      cartitems: cartItems,
      deliveryfees: delivery,

    })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

export default router;