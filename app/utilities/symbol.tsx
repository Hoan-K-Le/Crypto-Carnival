import { useAppSelector } from "../store/store";

type SymbolProps = {};

const getSymbol = (currentCurrency: string) => {
  return currentCurrency === "usd"
    ? "$"
    : currentCurrency === "eur"
    ? "€"
    : "£";
};

export default getSymbol;
