import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions/${userId}`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);
export const getSummary = createAsyncThunk(
  "transactions/getSummary",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/transactions/summary/${userId}`
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/transactions`, data);

      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Transaction failed"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    loading: false,
    error: null,
    success: false,
    transactions: [],
    summary: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.transactions = action.payload.transactions;
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch transactions";
    });
    builder.addCase(getSummary.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.summary = action.payload.summary;
    });
    builder.addCase(getSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch summary";
    });
    builder.addCase(createTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to create transaction";
    });
  },
});

export default transactionSlice.reducer;
