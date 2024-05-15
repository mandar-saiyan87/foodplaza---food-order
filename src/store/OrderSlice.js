import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  loading: false,
  error: null
}

export const sendtocart = createAsyncThunk('sendtocart', async (cart) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  })
  const data = await req.json()
  console.log(data)
  return data
})


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(sendtocart.pending, (state) => {
      state.loading = true
    })
      .addCase(sendtocart.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload)
      })
      .addCase(sendtocart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})


export const { } = orderSlice.actions

export default orderSlice.reducer

