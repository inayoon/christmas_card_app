import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCard: null,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard: (state, action) => {
      state.selectedCard = action.payload;
    },
  },
});

export const { selectCard } = cardSlice.actions;
export const selectCardState = (state) => state.cards.selectedCard;
export default cardSlice.reducer;
