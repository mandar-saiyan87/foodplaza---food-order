import mongoose from "mongoose";

const MenusSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ratings: {
    type: Number
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  prepTime: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  }
})

const Menus = mongoose.model('menus', MenusSchema)

export default Menus;