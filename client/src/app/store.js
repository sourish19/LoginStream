import { configureStore } from 'react-redux'
import authSlice from './authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice
  }
})
