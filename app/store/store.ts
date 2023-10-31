import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import currencyReducer from "./CurrencyReducer";
import coinsReducer from "./CoinsData";
import globalCoinReducer from "./CoinsBarData";
import coinGraphReducer from "./ChartSelectorData";
import { selectCoinReducer } from "./SelectCoinReducer";
import coinDetailsReducer from "./CoinDetailData";
import coinAssetReducer from "./CoinAsset";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    coins: coinsReducer,
    generalCoins: globalCoinReducer,
    coinGraph: coinGraphReducer,
    selectCoin: selectCoinReducer,
    coinDetails: coinDetailsReducer,
    coinAsset: coinAssetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
