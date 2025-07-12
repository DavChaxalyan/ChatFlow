import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import socket from '../../socket';
const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = createAsyncThunk('chat/fetchUsers', async () => {
  const res = await axios.get(`${API_URL}/api/users/users`);
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

export const sendMessageWithFile = createAsyncThunk(
  'chat/sendMessageWithFile',
  async ({ chatId, senderId, text, file, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('chatId', chatId);
      formData.append('senderId', senderId);
      if (text) formData.append('text', text);
      if (file) formData.append('file', file);

      const res = await axios.post(`${API_URL}/api/messages/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      socket.emit('sendMessage', res.data); // сразу отправляем по сокету

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveChatBackground = createAsyncThunk(
  'chat/saveChatBackground',
  async ({ chatId, backgroundUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/chat/${chatId}/background`, { backgroundUrl });
      return response.data.backgroundUrl;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createGroupChat = createAsyncThunk(
    'chat/createGroup',
    async ({ chatName, users }) => {
      const res = await axios.post(`${API_URL}/api/chat/gro`, { chatName, users });
      return res.data;
    }
);  

export const uploadFileMessage = createAsyncThunk(
  'chat/uploadFileMessage',
  async ({ file, chatId, senderId, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('chatId', chatId);
      formData.append('senderId', senderId);

      const res = await axios.post(`${API_URL}/api/messages/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchUnreadCounts = createAsyncThunk(
  'chat/fetchUnreadCounts',
  async (_, { getState }) => {
    const token = getState().auth.user.token;
    const res = await axios.get(`${API_URL}/api/chat/unread`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // [{ _id: chatId, count: 2 }, ...]
  }
);

export const fetchUserChats = createAsyncThunk(
  'chat/fetchUserChats',
  async (_, { getState }) => {
    const token = getState().auth.user.token;
    const res = await axios.get(`${API_URL}/api/chat`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    unreadCounts: {},
    chats: [],
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
      })
      .addCase(sendMessageWithFile.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessageWithFile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUnreadCounts.fulfilled, (state, action) => {
        const map = {};
        action.payload.forEach(({ _id, count }) => {
          map[_id] = count;
        });
        state.unreadCounts = map;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
  },
});

export const { clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
