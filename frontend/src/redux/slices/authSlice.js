import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token || null,
  loading: false,
};

export const loginUser = createAsyncThunk('auth/login', async (formData) => {
  const res = await axios.post('/api/auth/login', formData);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
