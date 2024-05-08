import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userNum: '',
  authenticated: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducer: {
    setAuth: (state, action) => { }
  }
})

export const { } = userSlice.actions
export default userSlice.reducer