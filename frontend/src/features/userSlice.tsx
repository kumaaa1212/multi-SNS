import { createSlice } from '@reduxjs/toolkit'
import Icongenerate from 'utils/functions/Avater'
import { FrendInfo } from 'types/internal'

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
  userLikeCount?: number
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
  userLikeCount: 0,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        username: action.payload.name,
        userId: String(action.payload.id),
        team: action.payload.team,
        icon: Icongenerate('bbdbdfklbnbfpbisnasdpvmavdsmvd'),
        bio: action.payload.bio,
        follow: action.payload.follow ? [...action.payload.follow] : [],
        follower: action.payload.follower ? [...action.payload.follower] : [],
        twitterURL: action.payload.twitterURL,
        teamURL: action.payload.teamURL,
      }
    },

    logoutUser: (state) => {
      return {
        ...initialState,
      }
    },

    updateUser: (state, action) => {
      return {
        ...state,
        username: action.payload.user.name,
        userId: String(action.payload.user.id),
        team: action.payload.user.team,
        icon: Icongenerate(action.payload.user.icon),
        iconPath: action.payload.user.icon,
        bio: action.payload.user.bio,
        follow: action.payload.follow ? action.payload.follow : [],
        follower: action.payload.follower ? action.payload.follower : [],
        twitterURL: action.payload.user.twitterURL,
        teamURL: action.payload.user.teamURL,
      }
    },
    updataLikeCount: (state, action) => {
      return {
        ...state,
        userLikeCount: action.payload.userLikeCount,
      }
    },
  },
})

export const { loginUser, logoutUser, updateUser, updataLikeCount } = userSlice.actions

export default userSlice.reducer
