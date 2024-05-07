import { createSlice, createSelector } from '@reduxjs/toolkit'
import { food_list } from '../assets/assets.js'

const initialState = {
  cartItems: [],
  delivery: 15,
  freeDelivery: 200,
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

export const cartSubtotal = (state) => state.cart.cartItems.reduce((price, item) => (price + item.menuItem.price * item.qty), 0)

export const cartState = (state) => state.cart

export const deliveryFees = createSelector(
  cartState,
  cartSubtotal,
  (cart, subtotal) => subtotal < cart.freeDelivery & subtotal != 0 ? cart.delivery : 0
)

export const cartTotal = createSelector(
  cartSubtotal,
  deliveryFees,
  (subtotal, delivery) => subtotal + delivery
)