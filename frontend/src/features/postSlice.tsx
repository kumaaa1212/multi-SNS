import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  titleText: string;
  contentText: string;
  labels: any[];
  thumbnailText: string;
}

const initialState:PostState = {
  titleText: "",
  contentText: "",
  labels:[],
  thumbnailText: "",
};

const modalSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      createTitleText: (state, action) => {
        state.titleText = action.payload;
      },
      createContentText: (state, action) => {
        state.contentText = action.payload;
      },
      addImgcontents: (state, action) => {
        state.contentText += action.payload;
      },
      addLabels: (state, action) => {
        console.log(action.payload)
        return{
          ...state,
          labels: action.payload
        }
      },
      addThumbnail: (state, action) => {
        state.thumbnailText = action.payload;
      }
    }
})
export const { createTitleText, createContentText, addImgcontents,addLabels,addThumbnail} = modalSlice.actions

export default modalSlice.reducer