import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from '../../config/config';

const BASE_URL = config.BASE_URL;

// Add Product (with images)
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in productData) {
        if (key === 'images') {
          productData.images.forEach((file) => formData.append('images', file));
        } else {
          formData.append(key, productData[key]);
        }
      }

      const response = await axios.post(`${BASE_URL}/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.product;
    } catch (err) {
      return rejectWithValue(err.response.data.error || 'Failed to add product');
    }
  }
);

// Get All Products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// Get Product By ID
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// Edit Product
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in productData) {
        if (key === 'images') {
          productData.images.forEach((file) => formData.append('images', file));
        } else {
          formData.append(key, productData[key]);
        }
      }

      const res = await axios.put(`${BASE_URL}/product/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/product/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// Get Stock For Admin
export const getProductStockForAdmin = createAsyncThunk(
  'products/stockStatus',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/admin/stock`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

const perfumeSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    product: null,
    adminStock: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      })

      // Admin Stock
      .addCase(getProductStockForAdmin.fulfilled, (state, action) => {
        state.adminStock = action.payload;
      });
  },
});

export default perfumeSlice.reducer;
