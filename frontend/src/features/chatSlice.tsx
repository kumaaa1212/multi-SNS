import Icongenerate from '@/components/parts/Avater'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    allChatRoom: (state, action) => {

    },
  },
})

export const { allChatRoom } = chatSlice.actions

export default chatSlice.reducer
