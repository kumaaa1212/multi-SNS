import Icongenerate from '@/utils/functions/Avater'
import { createSlice } from '@reduxjs/toolkit'

interface FrendInfo {
  icon: string
  username: string
  authorId: string
  team: string
}

interface UserState {
  username: string
  userId: string
  team: string
  icon: string
  iconPath: string
  bio: string
  follow: FrendInfo[]
  follower: FrendInfo[]
}

const initialState: UserState = {
  username: '',
  userId: '',
  team: '',
  icon: '',
  iconPath: '',
  bio: '',
  follow: [],
  follower: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.user_metadata.username
      state.userId = action.payload.id
      state.team = action.payload.user_metadata.team
      state.icon = Icongenerate(action.payload.user_metadata.icon)
      state.iconPath = action.payload.user_metadata.icon
      state.bio = action.payload.user_metadata.bio
      state.follow = action.payload.user_metadata.follow
      state.follower = action.payload.user_metadata.follower
    },
  },
})

export const { loginUser } = userSlice.actions

export default userSlice.reducer
