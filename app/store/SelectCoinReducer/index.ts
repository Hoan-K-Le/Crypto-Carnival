"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectCoinOne {
  coinOne: string;
  symbol: string;
}

const initialState: SelectCoinOne = {
  coinOne: "bitcoin",
  symbol: "btc",
};

export const coinOneSlice = createSlice({
  name: "coinOne",
  initialState,
  reducers: {
    updateSelectedCoinOne: (state, action: PayloadAction<string>) => {
      state.coinOne = action.payload;
    },
    updateSelectCoinOneSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const {
  updateSelectedCoinOne,
  updateSelectCoinOneSymbol,
} = coinOneSlice.actions;
export const coinOneReducer = coinOneSlice.reducer;

interface SelectCoinTwo {
  coinTwo: string;
}

const initialStateTwo: SelectCoinTwo = {
  coinTwo: "",
};

export const coinTwoSlice = createSlice({
  name: "coinTwo",
  initialState: initialStateTwo,
  reducers: {
    updateSelectedCoinTwo: (state, action: PayloadAction<string>) => {
      state.coinTwo = action.payload;
    },
  },
});

export const { updateSelectedCoinTwo } = coinTwoSlice.actions;
export const coinTwoReducer = coinTwoSlice.reducer;
