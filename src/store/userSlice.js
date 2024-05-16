import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  dbUser: null,
  loading: false,
  error: null
}

export const addUser = createAsyncThunk('addUser', async (userPhNum) => {
  // console.log(userPhNum)
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userPhNum)
  })
  const data = await req.json()
  return data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authSet: (state, action) => {
      const userData = action.payload
      state.token = userData
    },
    unsetAuth: (state) => {
      state.token = null
      state.dbUser = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state) => {
      state.loading = true
    })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        // console.log(action.payload)
        state.dbUser = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export const { authSet, unsetAuth } = userSlice.actions
export default userSlice.reducer
export const Token = state => state.auth.token;