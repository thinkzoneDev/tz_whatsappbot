import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getVersionThunk = createAsyncThunk("versions/get", async () => {
  let response = await api.get("getallappversion");
  return response.data;
});

export const createVersionThunk = createAsyncThunk("versions/create", async (body) => {
  let response = await api.post("createnewappversion", body);
  return response.data;
});

export const updateVersionThunk = createAsyncThunk("versions/update", async (reqbody) => {
  const id = reqbody._id;
  const { _id, ...body } = reqbody; // remove _id from reqbody and create new object called body
  let response = await api.put("updateappversion/" + id, body);
  return response.data;
});

export const deleteVersionThunk = createAsyncThunk("versions/delete", async (id) => {
  let response = await api.delete("deleteappversion/" + id);
  return response.data;
});
