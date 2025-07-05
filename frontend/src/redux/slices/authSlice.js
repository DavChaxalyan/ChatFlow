import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token || null,
  loading: false,
};

export const RegisterUser = createAsyncThunk('auth/register', async (formData) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, formData);
    return res.data;
  });

export const loginUser = createAsyncThunk('auth/login', async (formData) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, formData);
  return res.data;
});

export const FetchMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
  
    const res = await axios.get(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
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
          localStorage.setItem('token', action.payload.token);
          state.user = action.payload.user;
        })
        .addCase(RegisterUser.fulfilled, (state, action) => {
          state.token = action.payload.token;
        })
        .addCase(FetchMe.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
  });

export const { logout } = authSlice.actions;
export default authSlice.reducer;
