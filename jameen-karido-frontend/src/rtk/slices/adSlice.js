import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_approved_ads = createAsyncThunk(
  "customer/get_approved_ads",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/customer/ads");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const get_approved_ads_for_home = createAsyncThunk(
  "customer/get_approved_ads_for_home",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/customer/home-ads/");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);
export const get_ad_detail = createAsyncThunk(
  "customer/get_ad_detail",
  async ({ type, slug }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/customer/ad/detail/?type=${type}&slug=${slug}`,

        { withCredentials: true }
      );
      console.log(data.adDetail);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const fetch_Ad_by_category = createAsyncThunk(
  "customer/fetch_Ad_by_category",
  async ({ catname }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/customer/ads/${catname}`,

        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const upload_home_Ad = createAsyncThunk(
  "ads/upload_home_Ad",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/ad/home`, formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const upload_flat_Ad = createAsyncThunk(
  "ads/upload_flat_Ad",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/ad/flat`, formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const upload_land_Ad = createAsyncThunk(
  "ads/upload_land_Ad",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/ad/land`, formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const upload_shop_Ad = createAsyncThunk(
  "ads/upload_shop_Ad",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    console.log(formData, "thisis shop data");
    try {
      const { data } = await api.post(`/ad/shop`, formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const delete_HOME_Ad = createAsyncThunk(
  "agent/delete_HOME_Ad",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/ad/homes/${id}`,

        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const delete_FLAT_Ad = createAsyncThunk(
  "agent/delete_FLAT_Ad",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/ad/flats/${id}`,

        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);
export const delete_LAND_Ad = createAsyncThunk(
  "agent/delete_LAND_Ad",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/ad/lands/${id}`,

        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);
export const delete_SHOP_Ad = createAsyncThunk(
  "agent/delete_SHOP_Ad",
  async ({ id }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/ad/shops/${id}`,

        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);
const adSlice = createSlice({
  name: "ad",
  initialState: {
    activeSidebar: 0,
    loader: false,
    ApprovedAds: [],
    adDetail: {},
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    seActiveSidebar: (state, { payload }) => {
      state.activeSidebar = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_approved_ads.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(get_approved_ads.rejected, (state, { payload }) => {
        console.log("fail ho gya hai");
        state.errorMessage = payload?.message || "An error occurred"; // Safely handle payload
        state.loader = false;
      })
      .addCase(get_approved_ads.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        console.log(payload.data);
        state.ApprovedAds = payload?.data || [];
      })

      .addCase(get_ad_detail.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(get_ad_detail.rejected, (state, { payload }) => {
        console.log("fail ho gya hai");
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(get_ad_detail.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.adDetail = payload.adDetail;
      })

      .addCase(fetch_Ad_by_category.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(fetch_Ad_by_category.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(fetch_Ad_by_category.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = payload.data;
      })
      .addCase(get_approved_ads_for_home.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(get_approved_ads_for_home.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(get_approved_ads_for_home.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = payload.data;
      })
      .addCase(upload_home_Ad.pending, (state) => {
        state.loader = true;
      })
      .addCase(upload_home_Ad.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(upload_home_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = payload.data;
      })
      .addCase(upload_flat_Ad.pending, (state) => {
        state.loader = true;
      })
      .addCase(upload_flat_Ad.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(upload_flat_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = payload.data;
      })
      .addCase(upload_land_Ad.pending, (state) => {
        state.loader = true;
      })
      .addCase(upload_land_Ad.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(upload_land_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = payload.data;
      })
      .addCase(upload_shop_Ad.pending, (state) => {
        state.loader = true;
      })
      .addCase(upload_shop_Ad.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(upload_shop_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = payload?.data;
      })
      .addCase(delete_SHOP_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = state.ApprovedAds?.filter(
          (item) => item._id != payload?.data
        );
      })
      .addCase(delete_FLAT_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = state.ApprovedAds?.filter(
          (item) => item._id != payload?.data
        );
      })
      .addCase(delete_LAND_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = state.ApprovedAds?.filter(
          (item) => item._id != payload?.data
        );
      })
      .addCase(delete_HOME_Ad.fulfilled, (state, { payload }) => {
        state.successMessage = payload?.message || "Fetched successfully";
        state.loader = false;
        state.ApprovedAds = state.ApprovedAds?.filter(
          (item) => item._id != payload?.data
        );
      });
  },
});

export const { messageClear, seActiveSidebar } = adSlice.actions;
export default adSlice.reducer;
