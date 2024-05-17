import express from "express";
import Orders from "../models/Orders.js";

const router = express.Router()


router.get('', async (req, res) => {
  try {
    const allorders = await Orders.find().populate(('cartitems.menuItem'))
    if (allorders.length > 0) {
      return res.status(200).json(allorders)
    } else {
      return res.status(200).json([])
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})


router.post('', async (req, res) => {
  const { cartItems, delivery, finalAmount, userPhone, name, address, phone } = req.body
  try {
    const newOrder = await new Orders({
      user: userPhone,
      totalAmount: finalAmount,
      cartitems: cartItems,
      deliveryfees: delivery,
      name: name,
      address: address,
      phno: phone
    })
    const addNewOrder = await newOrder.save()
    res.status(201).json(addNewOrder)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

router.put('', async (req, res) => {
  const updatedOrder = req.body
  try {
    const updated = await Orders.findByIdAndUpdate(updatedOrder._id, updatedOrder, { new: true })
    if (!updated) { 
      return res.status(404).send('Order not found')
    }
    return res.status(200).json(updated)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

export default router;