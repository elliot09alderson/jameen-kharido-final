import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

// Async thunk for fetching agent details
export const agent_detail = createAsyncThunk(
  "agent/agent_detail",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/agent/me");

      return fulfillWithValue(data); // Directly return data as payload
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const agent_uploadDocument = createAsyncThunk(
  "agent/agent_uploadDocument",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/agent/uploadDocument", info);

      return fulfillWithValue(data); // Directly return data as payload
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const agent_update = createAsyncThunk(
  "agent/agent_update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put("/agent", info);

      return fulfillWithValue(data); // Directly return data as payload
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const agent_myads = createAsyncThunk(
  "agent/agent_myads",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/agent/myads");

      return fulfillWithValue(data); // Directly return data as payload
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const agentReducer = createSlice({
  name: "agent",
  initialState: {
    loader: false,
    agentInfo: null,
    adsInfo: [],
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
      state.agentInfo = null; // Reset AgentInfo on user reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(agent_detail.pending, (state) => {
        state.loader = true;
        state.errorMessage = ""; // Clear error message while loading
        state.successMessage = ""; // Clear success message while loading
      })
      .addCase(agent_detail.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(agent_detail.fulfilled, (state, { payload }) => {
        state.successMessage = "Agent details fetched successfully!";
        state.loader = false;
        state.agentInfo = payload?.data; // Set the AgentInfo to payload directly
      })
      .addCase(agent_uploadDocument.pending, (state) => {
        state.loader = true;
        state.errorMessage = ""; // Clear error message while loading
        state.successMessage = ""; // Clear success message while loading
      })
      .addCase(agent_uploadDocument.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(agent_uploadDocument.fulfilled, (state, { payload }) => {
        state.successMessage = "Agent details fetched successfully!";
        state.loader = false;
        state.documentInfo = payload?.data; // Set the AgentInfo to payload directly
      })
      .addCase(agent_update.pending, (state) => {
        state.loader = true;
        state.errorMessage = ""; // Clear error message while loading
        state.successMessage = ""; // Clear success message while loading
      })
      .addCase(agent_update.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(agent_update.fulfilled, (state, { payload }) => {
        state.successMessage = "Agent details fetched successfully!";
        state.loader = false;
        state.agentInfo = payload?.data; // Set the AgentInfo to payload directly
      })
      .addCase(agent_myads.pending, (state) => {
        state.loader = true;
        state.errorMessage = ""; // Clear error message while loading
        state.successMessage = ""; // Clear success message while loading
      })
      .addCase(agent_myads.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred.";
        state.loader = false;
      })
      .addCase(agent_myads.fulfilled, (state, { payload }) => {
        state.successMessage = "Agent details fetched successfully!";
        state.loader = false;
        state.adsInfo = payload?.data; // Set the AgentInfo to payload directly
      });
  },
});

// Export actions and reducer
export const { messageClear, user_reset } = agentReducer.actions;
export default agentReducer.reducer;
