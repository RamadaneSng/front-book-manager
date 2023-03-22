import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login.slice";
import bookSlice from "../features/books.slice";
import commentSlice from "../features/comment.slice";

export default configureStore({
  reducer: {
    login: loginReducer,
    book: bookSlice,
    comment: commentSlice,
  },
});
