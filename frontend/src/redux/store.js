import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import chatReducer from './slices/chatSlice.js';
import userReducer from './slices/userSlice.js';
import uiReducer from './slices/uiSlice.js';
import unsplashReducer from './slices/unsplashSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
    ui: uiReducer,
    unsplash: unsplashReducer,
  },
});
