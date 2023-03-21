import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentReducer: false,
  },
  reducers: {
    setCommentSate: (state, { payload }) => {
      state.commentReducer = payload;
    },
  },
});

export const { setCommentSate } = commentSlice.actions;
export default commentSlice.reducer;
