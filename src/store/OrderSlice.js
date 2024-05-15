import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
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
})


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  }
})


export const { } = orderSlice.actions

export default orderSlice.reducer

