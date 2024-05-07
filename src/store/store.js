import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import menuReducer from './menuSlice'
import cartReducer from './cartSlice'


const persistConfig = {
  key: 'root',
  storage,
}

const MenuPersistedReducer = persistReducer(persistConfig, menuReducer)
const CartPersistedReducer = persistReducer(persistConfig, cartReducer)


export const store = configureStore({
  reducer: {
    'menu': MenuPersistedReducer,
    'cart': CartPersistedReducer
  },
})

export const persistor = persistStore(store)





// import { configureStore } from '@reduxjs/toolkit'
// import menuReducer from './menuSlice'
// import cartReducer from './cartSlice'

// export const store = configureStore({
//   reducer: {
//     'menu': menuReducer,
//     'cart': cartReducer
//   },
// })
