import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

const API_URL = config.BASE_URL;

// Create Bundle
export const createBundle = createAsyncThunk(
  "bundle/createBundle",
  async (bundleData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in bundleData) {
        if (key === 'images') {
          bundleData.images.forEach((file) => formData.append('mainImage', file));
        } else {
          formData.append(key, bundleData[key]);
        }
      }

      const res = await axios.post(`${API_URL}/bundle`, bundleData ,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.bundle;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error creating bundle");
    }
  }
);

// Get All Bundles
export const getAllBundles = createAsyncThunk(
  "bundle/getAllBundles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}bundle`);
      return res.data.bundles;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error fetching bundles");
    }
  }
);

// Get Single Bundle by ID
export const getBundleById = createAsyncThunk(
  "bundle/getBundleById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/bundle/${id}`);
      return res.data.bundle;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error fetching bundle");
    }
  }
);

// Update Bundle
export const updateBundle = createAsyncThunk(
  "bundle/updateBundle",
  async ({ id, bundleData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/bundle/${id}`, bundleData);
      return res.data.bundle;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error updating bundle");
    }
  }
);

// Delete Bundle
export const deleteBundle = createAsyncThunk(
  "bundle/deleteBundle",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/bundle/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Error deleting bundle");
    }
  }
);

const bundleSlice = createSlice({
  name: "bundle",
  initialState: {
    loading: false,
    success: false,
    error: null,
    bundle: null,
    bundles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bundle = action.payload;
      })
      .addCase(createBundle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllBundles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBundles.fulfilled, (state, action) => {
        state.loading = false;
        state.bundles = action.payload;
      })
      .addCase(getAllBundles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getBundleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBundleById.fulfilled, (state, action) => {
        state.loading = false;
        state.bundle = action.payload;
      })
      .addCase(getBundleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBundle.fulfilled, (state, action) => {
        state.loading = false;
        state.bundle = action.payload;
        state.bundles = state.bundles.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(updateBundle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBundle.fulfilled, (state, action) => {
        state.loading = false;
        state.bundles = state.bundles.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBundle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bundleSlice.reducer;
