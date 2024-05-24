import express from "express";
import Orders from "../models/Orders.js";

const router = express.Router()


router.get('', async (req, res) => {
  try {

    const page = parseInt(req.query.page)
    const perPage = 4
    const totalOrderItems = await Orders.countDocuments()
    const totalPages = Math.ceil(totalOrderItems / perPage)

    const allorders = await Orders.find().populate(('cartitems.menuItem')).sort({ created: -1 }).skip((page - 1) * perPage).limit(perPage)
    if (allorders.length > 0) {
      return res.status(200).json({ allorders, totalOrderItems, page, totalPages })
    } else {
      return res.status(200).json([])
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

router.get('/currentuser/:id', async (req, res) => {
  +6
  const UserId = req.params.id
  const page = parseInt(req.query.page)
  const perPage = 4
  const totalOrderItems = await Orders.countDocuments()
  const totalPages = Math.ceil(totalOrderItems / perPage)
  // console.log(UserId)
  try {
    const userOrders = await Orders.find({ user: UserId }).populate(('cartitems.menuItem')).sort({ created: -1 }).skip((page - 1) * perPage).limit(perPage)
    if (userOrders.length > 0) {
      return res.status(200).json({ userOrders, totalOrderItems, page, totalPages })
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