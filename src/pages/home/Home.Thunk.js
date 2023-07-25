import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_messaging_history = createAsyncThunk("home/getmessagehistory", async () => {
  let response = await api.get("/get_messaging_history");
  return response.data;
});
