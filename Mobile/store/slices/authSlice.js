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

export const signIn = createAsyncThunk("auth/signIn", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    console.log(response, "response from signIn");

    if (response.status === 200) {
      state.signSuccess = true;
      return response.data;
    }
  } catch (err) {
    return false;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
    isLoggedIn: false,
    verifyLoading: false,
    verifyError: null,
    verifySuccess: false,
    signInLoading: false,
    signError: null,
    signSuccess: false,
    signUser: null,
    token: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.verifyLoading = false;
      state.verifyError = null;
      state.verifySuccess = false;
      state.user = null;
      state.signInLoading = false;
      state.signError = null;
      state.signSuccess = false;
      state.signUser = null;
      state.token = null;
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
      })
      .addCase(signIn.pending, (state) => {
        state.signInLoading = true;
        state.signError = null;
        state.signSuccess = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signSuccess = true;
        state.signInLoading = false;
        state.signUser = action.payload;
        state.token = action.payload.token;
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.token}`;
        state.isLoggedIn = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInLoading = false;
        state.signError = action.payload;
        state.signSuccess = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
        state.verifySuccess = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.verifyLoading = false;
        state.verifySuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError = action.payload;
        state.verifySuccess = false;
      });
  },
});

export const { resetRegisterState } = authSlice.actions;

export default authSlice.reducer;
