import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import MasterSlice from "./MasterSlice";

var logger = createLogger();
const store = configureStore({
  reducer: MasterSlice,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export default store;
