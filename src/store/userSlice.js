import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  dbUser: null,
  loginstatus: null,
  loading: false,
  error: null,
};

export const addUser = createAsyncThunk("addUser", async (currentUser) => {
  console.log(currentUser);
  // const req = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(currentUser),
  // });
  // const data = await req.json();
  // // console.log(data);
  // return data;
});

export const adminlogin = createAsyncThunk("adminlogin", async (usercreds) => {
  const req = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/adminlogin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usercreds),
    }
  );
  const data = await req.json();
  // console.log(data)
  if (data.token) {
    localStorage.setItem("adminToken", JSON.stringify(data.token));
  }
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authSet: (state, action) => {
      const userData = action.payload;
      state.token = userData;
    },
    unsetAuth: (state) => {
      state.token = null;
      state.dbUser = null;
    },
    adminLogout: (state) => {
      state.loginstatus = null;
      localStorage.removeItem("adminToken");
    },
    clearLoginStatus: (state) => {
      state.loginstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.dbUser = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(adminlogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminlogin.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.loginstatus = action.payload;
      })
      .addCase(adminlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { authSet, unsetAuth, adminLogout, clearLoginStatus } =
  userSlice.actions;
export default userSlice.reducer;
// export const Token = state => state.auth.token;
