import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentReducer: false,
    currentBook: [],
    comments: [],
  },
  reducers: {
    setCommentSate: (state, { payload }) => {
      state.commentReducer = payload;
    },
    addComment: (state, { payload }) => {
      state.comments.push(payload);
    },
    setCommentData: (state, { payload }) => {
      state.currentBook = payload;
    },
  },
});

export const { setCommentSate, addComment, setCommentData } =
  commentSlice.actions;
export default commentSlice.reducer;
