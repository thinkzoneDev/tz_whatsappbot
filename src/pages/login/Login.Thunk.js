import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const authenticateUserThunk = createAsyncThunk("login/authenticate", async (userObj) => {
  let response = await api.post("/authenticate_user", userObj);
  return response.data;
});
