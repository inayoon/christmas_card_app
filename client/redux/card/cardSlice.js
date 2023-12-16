import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCard: {
    index: null,
    title: null,
    url: null,
    letter: undefined,
    recipient: undefined,
    avatar: undefined,
  },
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard: (state, action) => {
      const { title, url, index } = action.payload;
      state.selectedCard = { ...state.selectedCard, title, url, index };
    },
    saveLetter: (state, action) => {
      const { letter } = action.payload;
      state.selectedCard.letter = letter;
    },
    updateEnvelope: (state, action) => {
      const { recipient, avatar } = action.payload;
      state.selectedCard = {
        ...state.selectedCard,
        recipient: recipient,
        avatar: avatar !== undefined ? avatar : state.selectedCard.avatar,
      };
    },
  },
});

export const { selectCard, saveLetter, updateEnvelope } = cardSlice.actions;
export const selectCardState = (state) => state.card;
export default cardSlice.reducer;
