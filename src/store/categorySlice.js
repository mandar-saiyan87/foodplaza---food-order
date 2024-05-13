import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
  categories: [],
  loading: false,
  error: null
}

export const getCategories = createAsyncThunk('getCategories', async () => {
  // console.log(process.env.REACT_APP_API_URL)
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/getcategories`)
  const data = await res.json()
  // console.log(data)
  return data
})

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
    })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export const { } = categorySlice.actions
export default categorySlice.reducer