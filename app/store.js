import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login.slice";
import booksSlice from "../features/books.slice";
import commentSlice from "../features/comment.slice";

export default configureStore({
  reducer: {
    login: loginReducer,
    books: booksSlice,
    comment: commentSlice,
  },
});
