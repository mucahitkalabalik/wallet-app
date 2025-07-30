import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

// ✅ Register thunk
export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/transactions/register", userData);

      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    success: false,

  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;

    },
  },
  extraReducers: (builder) => {
    builder

  },
});

export const { resetRegisterState } = authSlice.actions;

export default authSlice.reducer;
