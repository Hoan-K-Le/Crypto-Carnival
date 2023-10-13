export interface CoinDetailProps {
  symbol: string;
  name: string;
  description: { en: string };
  links: { blockchain_site: string[]; homepage: string[] };
  image: { small: string; thumb: string };
}
