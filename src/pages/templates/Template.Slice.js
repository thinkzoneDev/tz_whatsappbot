import { createSlice } from "@reduxjs/toolkit";
import { get_all_templates, update_template, createVersionThunk, deleteVersionThunk, updateVersionThunk } from "./Template.Thunk";

const initialState = {
  data: [],
  loading: false,
  status: "",
  message: "",
};

const TemplateSlice = createSlice({
  name: "templateslice",
  initialState,
  reducers: {},
  extraReducers: {
    [get_all_templates.pending]: (state, action) => {
      state.data = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [get_all_templates.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [get_all_templates.rejected]: (state, action) => {
      state.data = [];
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
    [update_template.pending]: (state, action) => {
      state.data = [];
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [update_template.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = "success";
    },
    [update_template.rejected]: (state, action) => {
      state.data = [];
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
    },
  },
});

export default TemplateSlice.reducer;
