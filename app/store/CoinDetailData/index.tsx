"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoinDetails = createAsyncThunk(
  "coinDetails/getCoinDetails",
  async (name: string) => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${name}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.error(`ERROR FROM COIN DETAIL REDUX ${err}`);
    }
  }
);

export interface CoinDetailProps {
  coinDetails: {
    name: string;
    symbol: string;
    links: { homepage: string[]; blockchain_site: string[] };
    image: { small: string };
    market_data: {
      current_price: { usd: number };
      ath: { usd: number };
      ath_date: { usd: string };
      ath_change_percentage: { usd: number };
      atl: { usd: number };
      atl_change_percentage: { usd: number };
      atl_date: { usd: string };
      price_change_percentage_24h: number;
      market_cap: { usd: number };
      market_cap_change_percentage_24h: number;
      fully_diluted_valuation: { usd: number };
      total_volume: { usd: number };
      circulating_supply: number;
      max_supply: number | null;
    };
    description: { en: string };
  }[];
}

const initialState: CoinDetailProps = {
  coinDetails: [],
};

const coinDetailSlice = createSlice({
  name: "coinDetails",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCoinDetails.pending, (state, action) => {
      state.coinDetails = [];
    }),
      builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.coinDetails = action.payload;
      }),
      builder.addCase(fetchCoinDetails.rejected, (state, action) => {
        state.coinDetails = [];
      });
  },
});

export default coinDetailSlice.reducer;
