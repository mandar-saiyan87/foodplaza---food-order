import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  orders: [],
  orderSuccess: '',
  delivery: 15,
  freeDelivery: 200,
  loading: false,
  error: null
}



export const sendtocart = createAsyncThunk('sendtocart', async (cart) => {
  console.log(cart)
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  })
  const data = await req.json()
  return data
})

export const getOrders = createAsyncThunk('getOrders', async () => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`)
  const data = await req.json()
  return data
})

export const updateOrders = createAsyncThunk('updateOrders', async (order) => {
  console.log(order)
  // const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(cart)
  // })
  // const data = await req.json()
  // return data
})

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
    },
    resetOrderSuccess: (state) => {
      state.orderSuccess = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendtocart.pending, (state) => {
      state.loading = true
    })
      .addCase(sendtocart.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
        state.orderSuccess = 'Success'
        state.cartItems = []
      })
      .addCase(sendtocart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.orderSuccess = 'Failed'
      })
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true
    })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
    builder.addCase(updateOrders.pending, (state) => {
      state.loading = true
    })
      .addCase(updateOrders.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload)
      })
      .addCase(updateOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})


export const { addtocart, removefromcart, resetOrderSuccess } = cartSlice.actions

export default cartSlice.reducer

export const cartSubtotal = (state) => state.cart.cartItems.reduce((price, item) => (price + item.menuItem.price * item.qty), 0)

export const cartState = (state) => state.cart

export const deliveryFees = createSelector(
  cartState,
  cartSubtotal,
  (cart, subtotal) => subtotal < cart.freeDelivery & subtotal !== 0 ? cart.delivery : 0
)

export const cartTotal = createSelector(
  cartSubtotal,
  deliveryFees,
  (subtotal, delivery) => subtotal + delivery
)