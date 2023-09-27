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
  symbol: string;
}

const initialStateTwo: SelectCoinTwo = {
  coinTwo: "",
  symbol: "",
};

export const coinTwoSlice = createSlice({
  name: "coinTwo",
  initialState: initialStateTwo,
  reducers: {
    updateSelectedCoinTwo: (state, action: PayloadAction<string>) => {
      state.coinTwo = action.payload;
    },
    updateSelectCoinTwoSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const {
  updateSelectedCoinTwo,
  updateSelectCoinTwoSymbol,
} = coinTwoSlice.actions;
export const coinTwoReducer = coinTwoSlice.reducer;

interface SelectCoinThree {
  coinThree: string;
  symbol: string;
}

const initialStateThree: SelectCoinThree = {
  coinThree: "",
  symbol: "",
};

export const coinThreeSlice = createSlice({
  name: "coinThree",
  initialState: initialStateThree,
  reducers: {
    updateSelectedCoinThree: (state, action: PayloadAction<string>) => {
      state.coinThree = action.payload;
    },
    updateSelectCoinThreeSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const {
  updateSelectedCoinThree,
  updateSelectCoinThreeSymbol,
} = coinThreeSlice.actions;
export const coinThreeReducer = coinThreeSlice.reducer;
