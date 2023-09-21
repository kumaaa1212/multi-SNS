import { createSlice } from '@reduxjs/toolkit'
import { LabelType } from 'types/internal'

interface PostState {
  titleText: string
  contentText: string
  labels: LabelType[]
  thumbnailText: string
  thumbnailImg: string
  displayThumbnailImg: string
}

const initialState: PostState = {
  titleText: '',
  contentText: '',
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
    addImgcontents: (state, action) => {
      state.contentText += action.payload
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
      state.labels = []
      state.thumbnailText = ''
    },
  },
})

export const {
  createTitleText,
  createContentText,
  addImgcontents,
  addLabels,
  addThumbnail,
  addThumbnailImg,
  stateReset,
  dispalyThumbnailImg,
} = modalSlice.actions

export default modalSlice.reducer
