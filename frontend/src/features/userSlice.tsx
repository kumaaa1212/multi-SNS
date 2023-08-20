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
  twitterURL?: string
  teamURL?: string
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
  twitterURL: '',
  teamURL: '',
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
      state.twitterURL = action.payload.user_metadata.twitterURL
      state.teamURL = action.payload.user_metadata.teamURL
    },
    logoutUser: (state) => {
      state.username = ''
      state.userId = ''
      state.team = ''
      state.icon = ''
      state.iconPath = ''
      state.bio = ''
      state.follow = []
      state.follower = []
    }
  },
})

export const { loginUser,logoutUser } = userSlice.actions

export default userSlice.reducer
