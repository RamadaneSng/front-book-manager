import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "stable",
  initialState: {
    loginReducer: true,
  },
  reducers: {
    setLoginSate: (state, { payload }) => {
      state.loginReducer = payload;
    },
  },
});

export const { setLoginSate } = loginSlice.actions;
export default loginSlice.reducer;
