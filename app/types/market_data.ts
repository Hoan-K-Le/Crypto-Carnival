export interface MarketDataProps {
  price_change_percentage_7d?: number;
  price_change_percentage_24h?: number;
  current_price?: Record<string, number>;
  high_24h: Record<string, number>;
  low_24h: Record<string, number>;
  total_volume: { btc: number; [key: string]: number };
  market_cap: Record<string, number>;
  fully_diluted_valuation: Record<string, number>;
  total_supply: number;
  circulating_supply: number;
}
