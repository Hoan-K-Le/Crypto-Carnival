export type TableDataProps = {
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
}
