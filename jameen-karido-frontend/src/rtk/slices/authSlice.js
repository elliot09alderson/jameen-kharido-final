import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("auth/customer/login", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_logout = createAsyncThunk(
  "auth/customer_logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/customer/logout");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// admin reducer ......................

export const admin_register = createAsyncThunk(
  "auth/admin_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin", info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("auth/admin/login", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_logout = createAsyncThunk(
  "auth/admin_logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin/logout");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// agent detail ...

export const agent_register = createAsyncThunk(
  "auth/agent-register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/agent", info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const agent_login = createAsyncThunk(
  "auth/agent_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("auth/agent/login", info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const agent_logout = createAsyncThunk(
  "auth/agent_logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/agent/logout");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const check_session = createAsyncThunk(
  "auth/check_session",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/check");

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: null,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error;
        state.loader = false;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message;
        state.loader = false;
        state.userInfo = payload?.customer;
      })
      .addCase(customer_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = payload.isPresent;
      })
      .addCase(customer_logout.fulfilled, (state, { payload }) => {
        state.userInfo = null;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
        state.loader = false;
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = payload.admin;
      })
      .addCase(admin_logout.fulfilled, (state, { payload }) => {
        state.userInfo = null;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(agent_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(agent_register.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(agent_register.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = payload.agent;
      })
      .addCase(agent_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(agent_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(agent_login.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = payload.data;
      })
      .addCase(agent_logout.fulfilled, (state, { payload }) => {
        state.userInfo = null;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(check_session.pending, (state) => {
        state.loader = true;
      })
      .addCase(check_session.rejected, (state, { payload }) => {
        // state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(check_session.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = payload.data;
      });
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
