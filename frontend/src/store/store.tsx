import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/postSlice'
import userReducer from '../features/userSlice'
const store = configureStore({
  reducer: {
    post: postReducer,
    user:userReducer
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
