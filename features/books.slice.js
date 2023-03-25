import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    bookId: null,
    // book: [],
  },
  reducers: {
    setBookId: (state, { payload }) => {
      state.bookId = payload;
    },
  },
});

export const { setBookId } = bookSlice.actions;
export default bookSlice.reducer;
