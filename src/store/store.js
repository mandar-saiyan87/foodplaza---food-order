import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";

const persistConfig = {
  key: "root",
  storage,
};

// const MenuPersistedReducer = persistReducer(persistConfig, menuReducer);
// const CartPersistedReducer = persistReducer(persistConfig, cartReducer);
// const UserPersistedReducer = persistReducer(persistConfig, userReducer);
// const CategoryPersistedReducer = persistReducer(persistConfig, categoryReducer);

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    user: userReducer,
    categories: categoryReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit'
// import menuReducer from './menuSlice'
// import cartReducer from './cartSlice'

// export const store = configureStore({
//   reducer: {
//     'menu': menuReducer,
//     'cart': cartReducer
//   },
// })
