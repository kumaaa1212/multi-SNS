import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
const store = configureStore({
    reducer: {
      post: postReducer,
    },
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;