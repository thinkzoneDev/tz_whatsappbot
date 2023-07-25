import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_all_media = createAsyncThunk("media/get", async () => {
  let response = await api.get("get_all_media");
  return response.data;
});

export const save_media = createAsyncThunk("media/create", async (body) => {
  console.log("-->body: ", body);
  let response = await api.post("save_media", body);
  return response.data;
});
