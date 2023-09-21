"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchGeneralCoins = createAsyncThunk(
  "generalCoins/getGeneralCoins",
  async (_, thunkAPI) => {
    try {
      const GLOBAL_URL = "https://api.coingecko.com/api/v3/global";
      const { data } = await axios.get(GLOBAL_URL);
      return data;
    } catch (error) {
      console.error("Error from fetching globa", error);
    }
  }
);

export interface GlobalDataType {
  globalData: {
    data: {
      active_cryptocurrencies: number;
      markets: number;
      total_volume: { usd: number };
      total_market_cap: { usd: number };
      market_cap_percentage: { btc: number; eth: number };
      market_cap_change_percentage_24h_usd: number;
    };
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: GlobalDataType = {
  globalData: {
    data: {
      active_cryptocurrencies: 0,
      markets: 0,
      total_volume: { usd: 0 },
      total_market_cap: { usd: 0 },
      market_cap_percentage: { btc: 0, eth: 0 },
      market_cap_change_percentage_24h_usd: 0,
    },
  },
  isLoading: false,
  error: null,
};

const globalCoinSlice = createSlice({
  name: "generalCoins",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(FetchGeneralCoins.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(FetchGeneralCoins.fulfilled, (state, action) => {
        state.globalData = action.payload;
        state.isLoading = false;
      }),
      builder.addCase(FetchGeneralCoins.rejected, (state, action) => {
        state.isLoading = true;
        state.error = "failed to fetch global data";
      });
  },
});

export default globalCoinSlice.reducer;
