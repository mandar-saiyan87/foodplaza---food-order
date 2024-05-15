import express from "express";
import Users from "../models/UserSchema.js";

const router = express.Router()

router.post('', async (req, res) => {
  const { phNum } = req.body
  try {
    const user = await Users.findOne({ mobileNumber: phNum })
    if (!user) {
      const newUser = await new Users({
        mobileNumber: phNum
      })
      const userSave = await newUser.save()
      return res.status(200).json({ dbUser: true })
    }
    return res.status(200).json({ dbUser: true })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

export default router