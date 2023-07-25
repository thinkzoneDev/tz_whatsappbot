import { createSlice } from "@reduxjs/toolkit";
import { authenticateUserThunk } from "./Login.Thunk";

const initialState = {
  data: [],
  loggedin: localStorage.getItem("loggedin") === "yes",
  loading: false,
  status: "",
  message: "",
};

const LoginSlice = createSlice({
  name: "loginslice",
  initialState,
  reducers: {
    check_login_status(state, action) {
      state.loggedin = localStorage.getItem("loggedin") === "yes" ? true : false;
    },
    logout(state, action) {
      localStorage.clear();
      state.loggedin = false;
    },
  },
  extraReducers: {
    [authenticateUserThunk.pending]: (state, action) => {
      state.data = [];
      state.loggedin = false;
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [authenticateUserThunk.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      console.log(action.payload);
      if (action.payload.auth) {
        state.loggedin = true;
        state.message = "Login success";
        localStorage.setItem("userid", action.payload.data[0].userid);
        localStorage.setItem("loggedin", "yes");
      } else {
        state.loggedin = false;
        state.message = "Invalid userid/ password";
        localStorage.clear();
      }
    },
    [authenticateUserThunk.rejected]: (state, action) => {
      state.data = [];
      state.loggedin = false;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
      localStorage.clear();
    },
  },
});

export const { check_login_status, logout } = LoginSlice.actions;
export default LoginSlice.reducer;
