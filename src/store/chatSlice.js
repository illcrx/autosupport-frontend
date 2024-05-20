import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    userInput: '',
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    clearUserInput: (state) => {
      state.userInput = '';
    },
  },
});

export const { addMessage, setUserInput, clearUserInput } = chatSlice.actions;

export default chatSlice.reducer;
