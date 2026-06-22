import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const initialState = {
  token: persistedState?.token ?? null,
  dbUser: persistedState?.dbUser ?? null,
  loginstatus: null,
  loading: false,
  error: null,
};

export const addUser = createAsyncThunk("addUser", async (currentUser) => {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentUser),
  });
  const data = await req.json();
  return data;
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
      state.token = userData.token || userData.accToken;
      state.dbUser = userData.user || userData;
      localStorage.setItem(
        "userState",
        JSON.stringify({
          token: state.token,
          dbUser: state.dbUser,
        })
      );
    },
    unsetAuth: (state) => {
      state.token = null;
      state.dbUser = null;
      localStorage.removeItem("userState");
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
        state.dbUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem(
          "userState",
          JSON.stringify({
            token: state.token,
            dbUser: state.dbUser,
          })
        );
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
