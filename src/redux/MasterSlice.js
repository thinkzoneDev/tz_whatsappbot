import { combineReducers } from "@reduxjs/toolkit";

// Slices
import HomeSlice from "../pages/home/Home.Slice";
import LoginSlice from "../pages/login/Login.Slice";
import TemplateSlice from "../pages/templates/Template.Slice";
import MediaSlice from "../pages/media_gallery/Media.Slice";
import MessagingSlice from "../pages/messaging/Messaging.Slice";

const MasterSlice = combineReducers({
  HomeSlice,
  LoginSlice,
  TemplateSlice,
  MediaSlice,
  MessagingSlice,
});
export default MasterSlice;
