import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

// Async thunk for fetching customer details
export const customer_detail = createAsyncThunk(
    "customer/customer_detail",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/customer/me");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const customer_update = createAsyncThunk(
    "customer/customer_update",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put("/customer",info);

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const customer_delete = createAsyncThunk(
    "customer/customer_delete",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete("/customer");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const customerReducer = createSlice({
    name: "customer",
    initialState: {
        loader: false,
        cutomerInfo: null,
        AdsInfo: null,
        documentInfo: null,
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        user_reset: (state) => {
            state.customerInfo = null; // Reset customerInfo on user reset
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(customer_detail.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(customer_detail.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(customer_detail.fulfilled, (state, { payload }) => {
                state.successMessage = "customer details fetched successfully!";
                state.loader = false;
                state.customerInfo = payload?.data; // Set the customerInfo to payload directly
            })
            .addCase(customer_update.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(customer_update.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(customer_update.fulfilled, (state, { payload }) => {
                state.successMessage = "customer details fetched successfully!";
                state.loader = false;
                state.customerInfo = payload?.data; // Set the customerInfo to payload directly
            })
            .addCase(customer_delete.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(customer_delete.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(customer_delete.fulfilled, (state, { payload }) => {
                state.successMessage = "customer details fetched successfully!";
                state.loader = false;
                state.customerInfo = payload?.data; // Set the customerInfo to payload directly
            })
            
            ;
    },
});

// Export actions and reducer
export const { messageClear, user_reset } = customerReducer.actions;
export default customerReducer.reducer;
