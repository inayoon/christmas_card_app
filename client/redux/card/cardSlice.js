import { createSlice } from "@reduxjs/toolkit";
import cardData from "../../src/data/card.json";

const initialState = {
  selectedCard: {
    index: null,
    title: null,
    url: null,
    letter: "",
  },
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard: (state, action) => {
      const { title, url, index } = action.payload;
      state.selectedCard = { title, url, index };
    },
    saveLetter: (state, action) => {
      const { letter } = action.payload;
      state.selectedCard = { ...state.selectedCard, letter };
    },
  },
});

export const { selectCard, saveLetter } = cardSlice.actions;
export const selectCardState = (state) => state.card;
export default cardSlice.reducer;
