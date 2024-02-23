import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './features/item/itemSlice';
import userReducer from './features/auth/userSlice';

const store = configureStore({
  reducer: {
    item:itemReducer,
    user: userReducer
  },
})

export default store;