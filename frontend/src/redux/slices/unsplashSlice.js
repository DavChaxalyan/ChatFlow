import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const fetchUnsplashImages = createAsyncThunk(
  'unsplash/fetchImages',
  async (query = 'nature', { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/unsplash/photos?query=${query}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const unsplashSlice = createSlice({
  name: 'unsplash',
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnsplashImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnsplashImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchUnsplashImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unsplashSlice.reducer;
