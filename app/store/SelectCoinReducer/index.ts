"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCoin {
  id: string;
  symbol: string;
}

const initialState: SelectedCoin[] = [];

export const selectCoinSlice = createSlice({
  name: "selectCoin",
  initialState,
  reducers: {
    updateSelectedCoin: (state, action: PayloadAction<SelectedCoin>) => {
      const idx = state.findIndex(coin => coin.id === action.payload.id);
      // checks if the coin exist in the array;
      if (idx > -1) {
        state[idx] = action.payload; // updates the specific coin with new data;
      } else {
        state.push(action.payload);
      }
    },
    removeSelectedCoin: (state, action: PayloadAction<string>) => {
      return state.filter((coin, i) => coin.id !== action.payload);
    },
  },
});

export const {
  updateSelectedCoin,
  removeSelectedCoin,
} = selectCoinSlice.actions;
export const selectCoinReducer = selectCoinSlice.reducer;
