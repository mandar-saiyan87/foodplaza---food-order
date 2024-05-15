import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  }
})

const Users = mongoose.model('users', UserSchema)
export default Users