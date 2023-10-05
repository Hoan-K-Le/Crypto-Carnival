"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGraphData = createAsyncThunk(
  "coinGraph/getCoinGraph",
  async (
    {
      currency,
      name,
      days,
      daily,
    }: { currency: string; name: string; days: string; daily: string },
    thunkAPI
  ) => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=${days}&interval=${daily}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(`Error fetching from chartselector ${err}`);
    }
  }
);

export interface CoinGraphProps {
  prices: [];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: CoinGraphProps = {
  prices: [],
  isLoading: false,
  error: null,
};

const coinGraphSlice = createSlice({
  name: "coinGraph",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGraphData.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGraphData.fulfilled, (state, action) => {
      state.prices = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchGraphData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export default coinGraphSlice.reducer;
