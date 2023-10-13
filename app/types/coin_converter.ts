export interface TwoCoinConverterProps {
  coin: { id: string; symbol: string; image: string; current_price: number };
  title: string;
  currencySymbol: string;
  coinAmount: string;
}
