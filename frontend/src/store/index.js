import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line no-unused-vars
import authReducer from "./auth";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;