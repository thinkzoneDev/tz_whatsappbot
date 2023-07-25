import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_process_status = createAsyncThunk("process/get", async (userid) => {
  let response = await api.get("get_process_status/" + userid);
  return response.data;
});

export const get_default_template = createAsyncThunk("messaging/get", async () => {
  let response = await api.get("get_default_template");
  return response.data;
});

export const send_templated_media_message = createAsyncThunk("messaging/create", async (body) => {
  let response = await api.post("send_templated_media_message", body);
  return response.data;
});
