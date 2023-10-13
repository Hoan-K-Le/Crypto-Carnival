import { CoinDetailProps } from "./coin_detail";
import { MarketDataProps } from "./market_data";

export interface CoinProp extends CoinDetailProps {
  market_data: MarketDataProps;
}
