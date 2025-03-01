import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

// Async thunk for fetching agent details
export const admin_detail = createAsyncThunk(
    "admin/admin_detail",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/me");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const admin_delete = createAsyncThunk(
    "admin/admin_delete",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete("/admin");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const admin_update = createAsyncThunk(
    "admin/admin_update",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put("/admin");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const admin_agent_verified = createAsyncThunk(
    "admin/admin_agent_verfied",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/agents/verified");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const admin_getAll_agents = createAsyncThunk(
    "admin/admin_getAll_agents",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/agents");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const admin_getAdDetails = createAsyncThunk(
    "admin/admin_getAdDetails",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/ad/:id");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
); export const admin_deleteAgentAd = createAsyncThunk(
    "admin/admin_deleteAgentAd",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/ad/:id");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const admin_getAgentById = createAsyncThunk(
    "admin/admin_getAgentById",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/agent/:id");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const admin_getAllBlockedAgents = createAsyncThunk(
    "admin/admin_getAllBlockedAgents",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/agents/blocked");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const admin_BlockedAgents = createAsyncThunk(
    "admin/admin_BlockedAgents",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/admin/agents/blocked/${info}`);

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const admin_getRequestedAds = createAsyncThunk(
    "admin/admin_getRequestedAds",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/admin/ad/pending");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const adminReducer = createSlice({
    name: "admin",
    initialState: {
        loader: false,
        AdminInfo: null,
        AgentInfo: null,
        BlockAgent: null,
        AdInfo: null,
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        user_reset: (state) => {
            state.AdminInfo = null; // Reset AgentInfo on user reset
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(admin_detail.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_detail.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_detail.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin details fetched successfully!";
                state.loader = false;
                state.AdminInfo = payload?.data; // Set the AgentInfo to payload directly
            })
            .addCase(admin_delete.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_delete.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_delete.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AdminInfo = null // Set the AgentInfo to payload directly
            })

            .addCase(admin_update.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_update.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_update.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AdminInfo = payload?.data;// Set the AgentInfo to payload directly
            })
            .addCase(admin_agent_verified.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_agent_verified.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_agent_verified.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AgentInfo = payload?.data;// Set the AgentInfo to payload directly
            })
            .addCase(admin_getAll_agents.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_getAll_agents.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_getAll_agents.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AgentInfo = payload?.data;// Set the AgentInfo to payload directly
            }).addCase(admin_getAgentById.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_getAgentById.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_getAgentById.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AgentInfo = payload?.data;// Set the AgentInfo to payload directly
            })
            .addCase(admin_getAdDetails.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_getAdDetails.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_getAdDetails.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AdInfo = payload?.data;// Set the AgentInfo to payload directly
            })
            .addCase(admin_deleteAgentAd.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(admin_deleteAgentAd.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(admin_deleteAgentAd.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AdInfo = null// Set the AgentInfo to payload directly
            })

            .addCase(admin_getAllBlockedAgents.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })

            .addCase(admin_getAllBlockedAgents.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })

            .addCase(admin_getAllBlockedAgents.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.BlockAgent = payload?.data// Set the AgentInfo to payload directly
            })
            .addCase(admin_BlockedAgents.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })

            .addCase(admin_BlockedAgents.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })

            .addCase(admin_BlockedAgents.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.BlockAgent = payload?.data// Set the AgentInfo to payload directly
            })


            .addCase(admin_getRequestedAds.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })

            .addCase(admin_getRequestedAds.fulfilled, (state, { payload }) => {
                state.successMessage = "Admin delete fetched successfully!";
                state.loader = false;
                state.AdInfo = payload?.data// Set the AgentInfo to payload directly
            })
            ;
    },
});

// Export actions and reducer
export const { messageClear, user_reset } = adminReducer.actions;
export default adminReducer.reducer;
