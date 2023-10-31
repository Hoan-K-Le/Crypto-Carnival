export interface AssetProps {
  name: string;
  total_price: number;
  purchaseDate: string;
  updateCoinData: {
    image: { thumb: string };
    symbol: string;
    market_data: {
      current_price: Record<string, number>;
      price_change_percentage_24h: number;
    };
  };
}
