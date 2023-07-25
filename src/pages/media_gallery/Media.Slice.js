import { createSlice } from "@reduxjs/toolkit";
import { get_all_media, save_media } from "./Media.Thunk";

const initialState = {
  data: [],
  loading: false,
  status: "",
  message: "",
};

const MediaSlice = createSlice({
  name: "mediaslice",
  initialState,
  reducers: {},
  extraReducers: {
    [get_all_media.pending]: (state, action) => {
      state.data = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [get_all_media.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [get_all_media.rejected]: (state, action) => {
      state.data = [];
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [save_media.pending]: (state, action) => {
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [save_media.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [save_media.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
  },
});

export default MediaSlice.reducer;
