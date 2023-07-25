import { createSlice } from "@reduxjs/toolkit";
import { get_messaging_history } from "./Home.Thunk";

const initialState = {
  data: [],
  loading: false,
  status: "",
  message: "",
};

const HomeSlice = createSlice({
  name: "homeslice",
  initialState,
  reducers: {},
  extraReducers: {
    [get_messaging_history.pending]: (state, action) => {
      state.data = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [get_messaging_history.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [get_messaging_history.rejected]: (state, action) => {
      state.data = [];
      state.loggedin = false;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
      localStorage.clear();
    },
  },
});

export default HomeSlice.reducer;
