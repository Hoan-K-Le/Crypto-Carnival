"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoinAsset = createAsyncThunk(
  "coinAsset/getCoinAsset",
  async ({ name, date }: { name: string; date: Date | string }, thunkApi) => {
    try {
      // date has to be DD/MM/YYYY format
      const url = `https://api.coingecko.com/api/v3/coins/${name}/history?date=${date}&localization=false`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.error(`ERROR FROM fetchCoinAsset ${err}`);
    }
  }
);

type CoinAssetProp = {
  coinAssets: [];
  isLoading: boolean;
};

const initialState: CoinAssetProp = {
  coinAssets: [],
  isLoading: false,
};

const coinAssetSlice = createSlice({
  name: "coinAsset",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCoinAsset.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCoinAsset.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coinAssets = action.payload;
    });
    builder.addCase(fetchCoinAsset.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});
export default coinAssetSlice.reducer;
