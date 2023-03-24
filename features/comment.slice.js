import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentReducer: false,
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
      state.comments = payload;
    },
  },
});

export const { setCommentSate, addComment, setCommentData } =
  commentSlice.actions;
export default commentSlice.reducer;
