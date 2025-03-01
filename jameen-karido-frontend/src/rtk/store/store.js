import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import adSlice from "../slices/adSlice.js";
import agentSlice from "../slices/agentSlice.js";
import adminSlice from "../slices/adminSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ad: adSlice,
    agent: agentSlice,
    admin: adminSlice,
  },
});
