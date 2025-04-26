import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import config from '../../config/config';

const API_URL = config.BASE_URL;



// Create custom perfume
export const createCustomPerfume = createAsyncThunk(
  "customPerfume/create",
  async (perfumeData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/customPerfume`, perfumeData);
      return response.data.customPerfume;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Get all custom perfumes
export const fetchCustomPerfumes = createAsyncThunk(
  "customPerfume/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/customPerfume/all`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Get by ID
export const fetchCustomPerfumeById = createAsyncThunk(
  "customPerfume/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/customPerfume/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Update
export const updateCustomPerfume = createAsyncThunk(
  "customPerfume/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/customPerfume/edit/${id}`, updates);
      return response.data.customPerfume;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Delete
export const deleteCustomPerfume = createAsyncThunk(
  "customPerfume/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/customPerfume/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Slice
const customPerfumeSlice = createSlice({
  name: "customPerfume",
  initialState: {
    customPerfumes: [],
    singlePerfume: null,
    loading: false,
    error: null,
    isCreated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCustomPerfume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomPerfume.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = true;
        state.customPerfumes.push(action.payload);
      })
      .addCase(createCustomPerfume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all
      .addCase(fetchCustomPerfumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomPerfumes.fulfilled, (state, action) => {
        state.loading = false;
        state.customPerfumes = action.payload;
      })
      .addCase(fetchCustomPerfumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single
      .addCase(fetchCustomPerfumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomPerfumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePerfume = action.payload;
      })
      .addCase(fetchCustomPerfumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCustomPerfume.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.customPerfumes.findIndex(p => p._id === updated._id);
        if (index !== -1) {
          state.customPerfumes[index] = updated;
        }
      })

      // Delete
      .addCase(deleteCustomPerfume.fulfilled, (state, action) => {
        state.customPerfumes = state.customPerfumes.filter(p => p._id !== action.payload);
      });
  },
});

export default customPerfumeSlice.reducer;
