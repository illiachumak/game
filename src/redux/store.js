import { configureStore } from '@reduxjs/toolkit'
import password from './slices/passwordSlice'


export const store = configureStore({
  reducer: {
    password,
  },
})