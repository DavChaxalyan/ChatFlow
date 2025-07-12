// redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backgrounds: {}, // { [chatId]: backgroundUrl }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setBackgroundForChat(state, action) {
        const { chatId, backgroundUrl } = action.payload;
        state.backgrounds[chatId] = backgroundUrl;
    },
  },
});

export const { setBackgroundForChat } = uiSlice.actions;
export default uiSlice.reducer;
