import { createSlice } from '@reduxjs/toolkit'
import { LabelType } from 'types/internal/album'

interface PostState {
  titleText: string
  contentText: string
  displayContentText: string
  labels: LabelType[]
  thumbnailText: string
  thumbnailImg: string
  displayThumbnailImg: string
}

const initialState: PostState = {
  titleText: '',
  contentText: '',
  displayContentText: '',
  labels: [],
  thumbnailText: '',
  thumbnailImg: '',
  displayThumbnailImg: '/thumbnail.png',
}

const modalSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createTitleText: (state, action) => {
      state.titleText = action.payload
    },

    createContentText: (state, action) => {
      state.contentText = action.payload
    },

    createDisplayContentText: (state, action) => {
      state.displayContentText = action.payload
    },

    addImgcontents: (state, action) => {
      state.contentText += action.payload
    },

    addDisplayImgcontents: (state, action) => {
      state.displayContentText += action.payload
    },

    addLabels: (state, action) => {
      return {
        ...state,
        labels: action.payload,
      }
    },

    addThumbnail: (state, action) => {
      state.thumbnailText = action.payload
    },

    addThumbnailImg: (state, action) => {
      state.thumbnailImg = action.payload
    },

    dispalyThumbnailImg: (state, action) => {
      state.displayThumbnailImg = URL.createObjectURL(action.payload)
    },

    stateReset: (state) => {
      state.titleText = ''
      state.contentText = ''
      state.displayContentText = ''
      state.labels = []
      state.thumbnailText = ''
    },
  },
})

export const {
  createTitleText,
  createContentText,
  createDisplayContentText,
  addImgcontents,
  addDisplayImgcontents,
  addLabels,
  addThumbnail,
  addThumbnailImg,
  stateReset,
  dispalyThumbnailImg,
} = modalSlice.actions

export default modalSlice.reducer
