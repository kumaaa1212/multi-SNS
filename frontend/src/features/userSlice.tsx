import { createSlice } from '@reduxjs/toolkit'
import Icongenerate from 'utils/functions/Avater'

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
      console.log(action.payload)
      state.username = action.payload.user.name
      state.userId = action.payload.user.id
      state.team = action.payload.user.team
      state.icon = Icongenerate(action.payload.user.icon)
      state.iconPath = action.payload.user.icon
      state.bio = action.payload.user.bio
      state.twitterURL = action.payload.user.twitterURL
      state.teamURL = action.payload.user.teamURL
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
    },
    updateUser: (state, action) => {
      state.username = action.payload.user.name
      state.userId = action.payload.user.id
      state.icon = Icongenerate(action.payload.user.icon)
      state.iconPath = action.payload.user.icon
      state.bio = action.payload.user.bio
      state.twitterURL = action.payload.user.twitterURL
      state.teamURL = action.payload.user.teamURL
    },
  },
})

export const { loginUser, logoutUser, updateUser } = userSlice.actions

export default userSlice.reducer
