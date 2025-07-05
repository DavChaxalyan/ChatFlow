import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

export const fetchUsers = createAsyncThunk('chat/fetchUsers', async () => {
  const res = await axios.get('/users');
  return res.data;
});

export const accessChat = createAsyncThunk('chat/accessChat', async (userId) => {
  const res = await axios.post('/chat', { userId });
  return res.data;
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (chatId) => {
  const res = await axios.get(`/chat/${chatId}/messages`);
  return res.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    currentChat: null,
    messages: [],
    loading: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.currentChat = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
