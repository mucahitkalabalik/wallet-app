import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

// ✅ Register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);

      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-email", code);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "code failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
    isLoggedIn: false, // Add this to track login state
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = authSlice.actions;

export default authSlice.reducer;
