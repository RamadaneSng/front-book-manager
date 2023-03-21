import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "pictures",
  initialState: {
    books: null,
  },
  reducers: {
    addBoos: (state, { payload }) => {
      state.books.push(payload);
    },
  },
});

export const { addBooks } = booksSlice.actions;
export default booksSlice.reducer;
