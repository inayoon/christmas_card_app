import { createSlice } from "@reduxjs/toolkit";
import cardData from "../../src/data/card.json";

const initialState = {
  selectedCard: {
    title: null,
    url: null,
  },
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard: (state, action) => {
      const { title, url } = action.payload;
      state.selectedCard = { title, url };
    },
  },
});
export const { selectCard } = cardSlice.actions;
export const selectCardState = (state) => state.card;
export default cardSlice.reducer;
