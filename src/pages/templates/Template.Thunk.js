import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_all_templates = createAsyncThunk("templates/get", async () => {
  let response = await api.get("get_all_templates");
  return response.data;
});

export const update_template = createAsyncThunk("templates/update", async (reqbody) => {
  console.log("thunk - ", reqbody);
  const id = reqbody.templateid;
  const body = reqbody.body; // remove _id from reqbody and create new object called body
  let response = await api.put("update_template/" + id, body);
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
