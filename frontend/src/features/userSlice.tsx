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
        icon: Icongenerate(action.payload.icon),
        bio: action.payload.bio,
        follow: action.payload.follows || [],
        follower: action.payload.followers || [],
        twitterURL: action.payload.twitterURL,
        teamURL: action.payload.teamURL,
      }
    },
    singUpUser: (state, action) => {
      return {
        ...state,
        username: action.payload.name,
        userId: String(action.payload.id),
        team: action.payload.team,
        icon: Icongenerate(action.payload.icon),
        bio: action.payload.bio,
        follow: action.payload.follows || [],
        follower: action.payload.followers || [],
        twitterURL: action.payload.twitterURL,
        teamURL: action.payload.teamURL,
      }
    },

    logoutUser: (state) => {
      return {
        ...state,
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
    },

    updateUser: (state, action) => {
      return {
        ...state,
        username: action.payload.name,
        userId: String(action.payload.id),
        team: action.payload.team,
        icon: Icongenerate(action.payload.icon),
        iconPath: action.payload.icon,
        bio: action.payload.bio,
        follow: action.payload.follows || [],
        follower: action.payload.followers || [],
        twitterURL: action.payload.twitterURL,
        teamURL: action.payload.teamURL,
      }
    },

    updataLikeCount: (state, action) => {
      return {
        ...state,
        userLikeCount: action.payload.userLikeCount,
      }
    },

    updataFrends: (state, action) => {
      return {
        ...state,
        follow: action.payload.follow,
        follower: action.payload.followers,
      }
    },
  },
})

export const { loginUser, logoutUser, updateUser, updataLikeCount, singUpUser, updataFrends } =
  userSlice.actions

export default userSlice.reducer
