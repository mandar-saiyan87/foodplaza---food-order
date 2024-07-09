import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  adminOrders: [],
  orders: [],
  orderSuccess: '',
  delivery: 15,
  freeDelivery: 200,
  loading: false,
  error: null,
  userpage: 1,
  usertotalPages: 0,
  usertotalOrderItems: 0,
  page: 1,
  totalPages: 0,
  totalOrderItems: 0
}



export const sendtocart = createAsyncThunk('sendtocart', async (cart) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  })
  const data = await req.json()
  return data
})

export const getOrders = createAsyncThunk('getOrders', async (loadpage) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders?page=${loadpage}`)
  const data = await req.json()
  return data
})

export const getordersCurrentUser = createAsyncThunk('getordersCurrentUser', async (orders) => {
  const { userid, currentPage } = orders
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/currentuser/${userid}?page=${currentPage}`);
  const data = req.json()
  return data
})


export const updateOrders = createAsyncThunk('updateOrders', async (order) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  const data = await req.json()
  return data
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const { menuItem, qty } = action.payload || {}
      // console.log(action.payload)
      if (!menuItem || qty == null) return;
      const menuExist = state.cartItems.findIndex(menu => menu.menuItem._id === menuItem._id)
      if (menuExist !== -1) {
        state.cartItems[menuExist].qty += qty
      } else {
        state.cartItems = [...state.cartItems, action.payload]
      }
    },
    removefromcart: (state, action) => {
      const { menuItem, qty } = action.payload || {}
      if (!menuItem || qty == null) return;
      const menuExist = state.cartItems.findIndex(menu => menu.menuItem._id === menuItem._id)
      if (menuExist !== -1) {
        state.cartItems[menuExist].qty += qty
        if (state.cartItems[menuExist].qty === 0) {
          state.cartItems = state.cartItems?.filter(menu => menu.qty !== 0)
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
        // console.log(action.payload)
        state.loading = false
        const { allorders, totalOrderItems, page, totalPages } = action.payload
        console.log(allorders)
        // const uniqueOrder = allorders?.filter(
        //   (orderItem) => !state.orders.some((item) => item._id === orderItem._id)
        // )
        state.adminOrders = [...state.adminOrders, ...allorders]
        // state.adminOrders = [...allorders]
        state.page = page
        state.totalPages = totalPages
        state.totalOrderItems = totalOrderItems
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
        const updated = action.payload
        const updatedOrder = state.orders.findIndex(order => order._id === updated._id)
        state.orders[updatedOrder] = updated
      })
      .addCase(updateOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
    builder.addCase(getordersCurrentUser.pending, (state) => {
      state.loading = true
    })
      .addCase(getordersCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        // state.orders = action.payload
        const { userOrders, totalOrderItems, page, totalPages } = action.payload
        const uniqueOrder = userOrders?.filter(
          (orderItem) => !state.orders.some((item) => item._id === orderItem._id)
        )
        state.orders = [...state.orders, ...uniqueOrder]
        state.userpage = page
        state.usertotalPages = totalPages
        state.usertotalOrderItems = totalOrderItems
      })
      .addCase(getordersCurrentUser.rejected, (state, action) => {
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