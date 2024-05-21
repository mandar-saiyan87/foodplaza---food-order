import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  }
})

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

const Users = mongoose.model('users', UserSchema)
export const Admin = mongoose.model('adminuser', AdminSchema)
export default Users
