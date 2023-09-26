import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import currencyReducer from "./CurrencyReducer";
import coinsReducer from "./CoinsData";
import globalCoinReducer from "./CoinsBarData";
import coinGraphReducer from "./ChartSelectorData";
import { coinOneReducer, coinTwoReducer } from "./SelectCoinReducer";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    coins: coinsReducer,
    generalCoins: globalCoinReducer,
    coinGraph: coinGraphReducer,
    coinOne: coinOneReducer,
    coinTwo: coinTwoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
