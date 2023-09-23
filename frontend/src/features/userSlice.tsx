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
      console.log(action.payload)
      return {
        ...state,
        username: action.payload.name,
        userId: String(action.payload.id),
        team: action.payload.team,
        icon: Icongenerate(
          action.payload.icon ? action.payload.icon : 'bbdbdfklbnbfpbisnasdpvmavdsmvd',
        ),
        bio: action.payload.bio,
        follow: action.payload.follows.length > 0 ? action.payload.follows : [],
        follower: action.payload.followers.length > 0 ? action.payload.followers : [],
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
        follow: action.payload.follows.length > 0 ? action.payload.follows : [],
        follower: action.payload.followers.length > 0 ? action.payload.followers : [],
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

    updataFrends: (state, action) => {
      // console.log(action.payload)
      // return {
      //   ...state,
      //   follow: action.payload.follow,
      // }
    },
  },
})

export const { loginUser, logoutUser, updateUser, updataLikeCount, updataFrends } =
  userSlice.actions

export default userSlice.reducer
