import express from "express";
import Users from "../models/UserSchema.js";
import { Admin } from "../models/UserSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const router = express.Router()
const { JWT_SECRET } = process.env

router.post('', async (req, res) => {
  // console.log(req.body)
  const { phNum } = req.body
  try {
    const user = await Users.findOne({ mobileNumber: phNum })
    if (!user) {
      const newUser = await new Users({
        mobileNumber: phNum
      })
      const user = await newUser.save()
      return res.status(200).json(user)
    }
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal server error')
  }
})

router.post('/adminlogin', async (req, res) => {
  const { username, password } = req.body
  try {
    const isAdmin = await Admin.findOne({ username: username })
    if (!isAdmin) {
      return res.status(401).json({ code: 401, message: 'Login failed. User not found.', status: 'Warning' });
    }
    const passwordMatch = await bcrypt.compare(password, isAdmin.password)
    if (!passwordMatch) {
      return res.status(401).json({ code: 401, message: 'Login failed. Wrong password.', status: 'Error' });
    }
    const token = jwt.sign({ id: isAdmin._id, username: isAdmin.username }, JWT_SECRET)
    return res.status(200).json({ code: 200, token, message: 'Login Successful', isAdmin: true })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
})



export default router