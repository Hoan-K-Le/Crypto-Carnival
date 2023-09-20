'use client'
import axios from 'axios'

export const getBitcoinData = async (currency: string) => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=180&interval=daily`
    )
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
