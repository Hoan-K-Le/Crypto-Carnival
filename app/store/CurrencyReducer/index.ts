import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BiDollar, BiEuro } from 'react-icons/bi'
import { PiCurrencyGbpLight } from 'react-icons/pi'

interface CurrencyState {
  currencies: string
}

const initialState: CurrencyState = {
  currencies: 'usd',
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateSelectedCurrency: (state, action: PayloadAction<string>) => {
      state.currencies = action.payload
    },
  },
})

export const { updateSelectedCurrency } = currencySlice.actions
export default currencySlice.reducer
