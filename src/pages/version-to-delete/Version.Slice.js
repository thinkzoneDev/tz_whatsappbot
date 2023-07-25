import { createSlice } from "@reduxjs/toolkit";
import { createVersionThunk, deleteVersionThunk, getVersionThunk, updateVersionThunk } from "./Version.Thunk";

const initialState = {
  data: [],
  loading: false,
  status: "",
  message: "",
};

const VersionSlice = createSlice({
  name: "versionslice",
  initialState,
  reducers: {},
  extraReducers: {
    [getVersionThunk.pending]: (state, action) => {
      state.data = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [getVersionThunk.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [getVersionThunk.rejected]: (state, action) => {
      state.data = [];
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [createVersionThunk.pending]: (state, action) => {
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [createVersionThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [createVersionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [updateVersionThunk.pending]: (state, action) => {
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [updateVersionThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [updateVersionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [deleteVersionThunk.pending]: (state, action) => {
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [deleteVersionThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [deleteVersionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
  },
});

export default VersionSlice.reducer;
