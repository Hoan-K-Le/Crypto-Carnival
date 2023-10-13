import React from "react";
import getSymbol from "@/app/utilities/symbol";
import { useAppSelector } from "@/app/store/store";
import { getIcon } from "@/app/utilities/getIcons";
import getAvg from "@/app/utilities/getAvg";
import { CoinDetailProps } from "@/app/types/coin_detail";
import { MarketDataProps } from "@/app/types/market_data";
import Icon from "../../Icon/Icon";

type CoinInfoProps = {
  coinDetail: CoinDetailProps & {
    market_data: MarketDataProps;
  };
};

function CoinInfo({ coinDetail }: CoinInfoProps) {
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const {
    image: { thumb = "" },
    name = "",
    symbol = "",
    links: { homepage = "" },
  } = coinDetail || {};
  const {
    price_change_percentage_7d = 0,
    current_price = { [currentCurrency]: 0 },
    high_24h = { [currentCurrency]: 0 },
    low_24h = { [currentCurrency]: 0 },
  } = coinDetail.market_data;

  return (
    <div className="bg-white p-10 rounded-xl shadow w-5/12">
      <div className="flex gap-4">
        <img src={thumb} className="h-[50px] w-[50px]" />
        <div>
          <p className="text-2xl">
            {name} ({symbol})
          </p>
          <p className="flex items-center gap-2">
            {homepage}
            <Icon iconVariant="copy" />
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <p className="text-4xl">
          {getSymbol(currentCurrency)}
          {current_price[currentCurrency]}
        </p>
        <div
          className={`flex items-center gap-2 ${getAvg(
            price_change_percentage_7d
          )}`}
        >
          <p>{getIcon(price_change_percentage_7d)}</p>
          <p className="text-xl ">{price_change_percentage_7d}%</p>
        </div>
      </div>
      <p className="mt-4 text-xl flex items-center gap-2 border-b-2 pb-5">
        Profit: <span className="text-2xl text-[#01F1E3]">$1,504</span>
      </p>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-3">
          <Icon iconVariant="arrowUp" className="mt-2 text-[#01F1E3]" />
          <div>
            <p className="flex items-center text-xl">All time high:</p>
            <p className="text-[#B9B9BA]">Wed, 14 Sept 2023</p>
          </div>
        </div>
        <p className="text-2xl">
          {getSymbol(currentCurrency)}
          {high_24h[currentCurrency]}
        </p>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-3">
          <Icon iconVariant="arrowDown" className="mt-2 text-[#FE2264]" />
          <div>
            <p className="flex items-center text-xl">All time low:</p>
            <p className="text-[#B9B9BA]">Wed, 10 Sept 2023</p>
          </div>
        </div>
        <p className="text-2xl">
          {getSymbol(currentCurrency)} {low_24h[currentCurrency]}
        </p>
      </div>
    </div>
  );
}

export default CoinInfo;
