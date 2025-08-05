import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";
// Diğer slice'lar varsa onları da ekle

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    // Diğer reducer'lar...
  },
});

export default store;
