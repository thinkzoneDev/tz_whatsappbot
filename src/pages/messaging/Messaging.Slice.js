import { createSlice } from "@reduxjs/toolkit";
import { get_process_status, get_default_template, send_templated_media_message } from "./Messaging.Thunk";

const initialState = {
  data: [],
  processdata: [],
  loading: false,
  status: "",
  message: "",
};

const MessagingSlice = createSlice({
  name: "messagingslice",
  initialState,
  reducers: {},
  extraReducers: {
    [get_process_status.pending]: (state, action) => {
      state.processdata = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [get_process_status.fulfilled]: (state, action) => {
      state.processdata = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [get_process_status.rejected]: (state, action) => {
      state.processdata = [];
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [get_default_template.pending]: (state, action) => {
      state.data = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [get_default_template.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [get_default_template.rejected]: (state, action) => {
      state.data = [];
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [send_templated_media_message.pending]: (state, action) => {
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [send_templated_media_message.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [send_templated_media_message.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
  },
});

export default MessagingSlice.reducer;
