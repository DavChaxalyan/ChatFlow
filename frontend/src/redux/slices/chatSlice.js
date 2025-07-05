import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import socket from '../../socket';
const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = createAsyncThunk('chat/fetchUsers', async () => {
  const res = await axios.get(`${API_URL}/api/users`);
  return res.data;
});

export const accessChat = createAsyncThunk('chat/accessChat', async (userId) => {
  const res = await axios.post(`${API_URL}/api/chat`, { userId });
  return res.data;
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (chatId) => {
    const res = await axios.get(`${API_URL}/api/chat/${chatId}/messages`);
    return res.data;
});

export const sendMessages = createAsyncThunk('chat/sendMessages', async (form) => {
    const res = await axios.post(`${API_URL}/api/chat/${form.chatId}/messages`, form);
    socket.emit('sendMessage', form);
    return res.data;
});

export const createGroupChat = createAsyncThunk(
    'chat/createGroup',
    async ({ chatName, users }) => {
      const res = await axios.post(`${API_URL}/api/chat/gro`, { chatName, users });
      return res.data;
    }
);  

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
