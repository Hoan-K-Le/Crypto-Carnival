"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/store";
import { FetchGeneralCoins } from "@/app/store/CoinsBarData";
import { GlobalDataType } from "@/app/store/CoinsBarData";
import Icon from "../Icon/Icon";
import Coins from "./Coins";
import Exchange from "./Exchange";
import GeneralMarketCap from "./GeneralMarketCap";
import GeneralTotalVolume from "./GeneralTotalVolume";
import GeneralAvg from "./GeneralAvg";

const CoinBar = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const getData = useAppSelector(state => state.generalCoins.globalData);
  const coinSymbol = useAppSelector(state => state.coins.coins);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(FetchGeneralCoins());
      setDataFetched(true);
    }
  }, [dispatch]);
  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  const formatNumber = (number: number): string => {
    if (number >= 1e12) {
      return (number / 1e12).toFixed(1) + " T";
    } else if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }

    return number.toString();
  };

  // active_currency,markets,total_volume, total_market_cap
  return (
    <div className="dark:bg-[#1E1932] bg-[#353570]  text-white p-3.5 flex items-center text-xs justify-center gap-7">
      <Coins getData={getData} />
      <Exchange getData={getData} />
      <GeneralMarketCap formatNumber={formatNumber} getData={getData} />
      <GeneralTotalVolume formatNumber={formatNumber} getData={getData} />
      <GeneralAvg getData={getData} />
    </div> // end of parent container
  );
};

export default CoinBar;
