import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
}

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
    }
  }
})

export const { authSet, unsetAuth } = userSlice.actions
export default userSlice.reducer
export const Token = state => state.auth.token;