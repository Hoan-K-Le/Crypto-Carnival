'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// limit the api rate request

export const fetchCoins = createAsyncThunk(
  'coins/getCoins',
  async (currency: string, thunkAPI) => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      const { data } = await axios.get(url)
      return data
    } catch (error) {
      console.error(`ERROR FROM FETCHCOINS`, error)
    }
  }
)

export interface CoinsType {
  coins: {
    id: string
    name: string
    current_price: number
    price_change_percentage_1h_in_currency: number
    price_change_percentage_24h_in_currency: number
    price_change_percentage_7d_in_currency: number
    market_cap_rank: number
    market_cap_change_24h: number
    symbol: string
    sparkline_in_7d: { price: number[] }
    image: string
    total_volume: number
    market_cap: number
    circulating_supply: number
    total_supply: number
  }[]
  isLoading: boolean
  error: string | null
}

const initialState: CoinsType = {
  coins: [],
  isLoading: false,
  error: null,
}

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCoins.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(fetchCoins.fulfilled, (state: any, action: any) => {
        state.coins = action.payload
        state.isLoading = false
      }),
      builder.addCase(fetchCoins.rejected, (state: any, action: any) => {
        state.isLoading = false
        // state.error = action.payload.error.message
      })
  },
})

export default coinsSlice.reducer
