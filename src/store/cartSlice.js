import { createSlice } from '@reduxjs/toolkit'
import { food_list } from '../assets/assets.js'

const initialState = {
  cartItems: []
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const { menuItem, qty } = action.payload
      // console.log(action.payload)
      const menuExist = state.cartItems.findIndex(menu => menu.menuItem._id === menuItem._id)
      if (menuExist !== -1) {
        state.cartItems[menuExist].qty += qty
      } else {
        state.cartItems = [...state.cartItems, action.payload]
      }
    },
    removefromcart: (state, action) => {
      const { menuItem, qty } = action.payload
      const menuExist = state.cartItems.findIndex(menu => menu.menuItem._id === menuItem._id)
      if (menuExist !== -1) {
        state.cartItems[menuExist].qty += qty
        if (state.cartItems[menuExist].qty === 0) {
          state.cartItems = state.cartItems.filter(menu => menu.qty !== 0)
        }
      }
    }
  }
})


export const { addtocart, removefromcart } = cartSlice.actions

export default cartSlice.reducer