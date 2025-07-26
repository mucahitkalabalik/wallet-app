import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// Diğer slice'lar varsa onları da ekle

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Diğer reducer'lar...
  },
});


export default store;