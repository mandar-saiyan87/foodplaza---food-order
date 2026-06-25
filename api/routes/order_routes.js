import express from "express";
import Orders from "../models/Orders.js";
import { getIo } from "../socket.js";
import dotenv from 'dotenv';

dotenv.config();

const N8N_WEBHOOK_URL_TEST = process.env.N8N_WEBHOOK_URL_TEST;
const N8N_WEBHOOK_URL_PROD = process.env.N8N_WEBHOOK_URL_PROD;

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const perPage = 4;
    const totalOrderItems = await Orders.countDocuments();
    const totalPages = Math.ceil(totalOrderItems / perPage);

    const allorders = await Orders.find()
      .populate("cartitems.menuItem")
      .sort({ created: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (allorders.length > 0) {

      return res
        .status(200)
        .json({ allorders, totalOrderItems, page, totalPages });
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/currentuser/:id", async (req, res) => {
  const user = req.params.id;
  const page = parseInt(req.query.page);
  const perPage = 4;
  const totalOrderItems = await Orders.countDocuments();
  const totalPages = Math.ceil(totalOrderItems / perPage);
  try {
    const userOrders = await Orders.find({ user: user })
      .populate("cartitems.menuItem")
      .sort({ created: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (userOrders.length > 0) {
      return res
        .status(200)
        .json({ userOrders, totalOrderItems, page, totalPages });
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("", async (req, res) => {
  const { cartItems, delivery, finalAmount, user, name, address, phone } =
    req.body;
  // console.log(req.body);
  try {
    const newOrder = await new Orders({
      user: user,
      totalAmount: finalAmount,
      cartitems: cartItems,
      deliveryfees: delivery,
      name: name,
      address: address,
      phno: phone,
    });
    const addNewOrder = await newOrder.save();
    console.log(addNewOrder);

    // Emit the new order to the "neworder" room
    const io = getIo();
    io.to("neworder").emit("new-order", addNewOrder);

    res.status(201).json(addNewOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// router.put("", async (req, res) => {
//   const updatedOrder = req.body;
//   try {
//     const updated = await Orders.findByIdAndUpdate(
//       updatedOrder._id,
//       updatedOrder,
//       { new: true }
//     );
//     if (!updated) {
//       return res.status(404).send("Order not found");
//     }
//     return res.status(200).json(updated);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error");
//   }
// });

router.patch("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const updates = req.body;

  // console.log("Order ID:", orderId);
  // console.log("Updates:", updates);

  try {
    let order = await Orders.findById(orderId).populate({
      path: "cartitems.menuItem",
      select: "title price",
    })
      .populate({
        path: "user",
        select: "emailId username",
      });
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Update only the fields that are present in the request body
    if (order.status !== "delivered" && order.status !== "cancelled") {

      Object.keys(updates).forEach(key => {
        order[key] = updates[key];
      });

      const updatedOrder = await order.save();
      // Emmit real-time update
      const io = getIo();
      io.to(`order-${orderId}`).emit("order-updated", {
        orderid: updatedOrder._id,
        status: updatedOrder.status
      });


      // To call n8n api
      if (["accepted", "delivered", "cancelled"].includes(updatedOrder.status)) {
        // const itemsOrdered = order.cartitems.map((item) =>
        //   `${item.qty}x ${item.menuItem.title}`
        // ).join(", ")

        const emailData = {
          "orderId": order._id.toString().toUpperCase().slice(0, 10),
          "customerName": order.user.username,
          "customerEmail": order.user.emailId,
          "itemsOrdered": order.cartitems,
          "totalAmount": `$${order.totalAmount}`,
          "status": order.status
        }
        // console.log(emailData)
        fetch(`${N8N_WEBHOOK_URL_PROD}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        })
          .then((res) => {
            if (!res.ok) console.error("n8n webhook failed:", res.status)
            else console.log("n8n webhook triggered successfully")
          })
          .catch((error) => console.error("n8n webhook failed:", error.message))
      }


      return res.status(200).json(updatedOrder);
    }

    return res.status(400).send("Order is already delivered, can not be updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});






export default router;



