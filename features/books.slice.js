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
    setBook: (state, { payload }) => {
      state.pictures = payload;
    },
    addBook: (state, { payload }) => {
      state.book.push(payload);
    },
    editBook: (state, { payload }) => {
      state.book = state.book.map((pic) => {
        if (pic.id === payload[1]) {
          return {
            ...pic,
            artist: payload[0],
          };
        } else {
          return pic;
        }
      });
    },
    deleteBook: (state, { payload }) => {
      state.book = state.book.filter((pic) => pic.id !== payload);
    },
  },
});

export const { setBookId, addBook, editBook, deleteBook, setBook } =
  bookSlice.actions;
export default bookSlice.reducer;
