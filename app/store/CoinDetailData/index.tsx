"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CoinDetailProps } from "@/app/types/coin_detail";
import { MarketDataProps } from "@/app/types/market_data";
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

type CoinDetailsProps = {
  coinDetails:
    | (CoinDetailProps &
        {
          market_data: MarketDataProps;
        }[])
    | [];
};

const initialState: CoinDetailsProps = {
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
