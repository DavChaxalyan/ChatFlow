import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (userData, { getState, rejectWithValue }) => {
      try {
        const { auth } = getState();
        const { token } = auth;
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
  
        const { data } = await axios.put(`${API_URL}/api/users/profile`, userData, config);
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  );
  

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
