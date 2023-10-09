import React from "react";
import getSymbol from "@/app/utilities/symbol";
import { useAppSelector } from "@/app/store/store";
import Icon from "../../Icon/Icon";
import { getIcon } from "@/app/utilities/getIcons";
import getAvg from "@/app/utilities/getAvg";

type CoinInfoProps = {
  coinDetail: {
    name: string;
    symbol: string;
    image: { thumb: string };
    links: { homepage: string };
    market_data: {
      current_price: { usd: number };
      price_change_percentage_7d: number;
      high_24h: { usd: number };
      low_24h: { usd: number };
    };
  };
};

function CoinInfo({ coinDetail }: CoinInfoProps) {
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  return (
    <div className="bg-white p-10 rounded-xl shadow w-5/12">
      <div className="flex gap-4">
        <img src={coinDetail?.image.thumb} className="h-[50px] w-[50px]" />
        <div>
          <p className="text-2xl">
            {coinDetail?.name} ({coinDetail?.symbol})
          </p>
          <p className="flex items-center gap-2">
            {coinDetail?.links.homepage}
            <Icon iconVariant="copy" />
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <p className="text-4xl">
          {getSymbol(currentCurrency)}
          {coinDetail?.market_data.current_price.usd}
        </p>
        <div
          className={`flex items-center gap-2 ${getAvg(
            coinDetail?.market_data.price_change_percentage_7d
          )}`}
        >
          <p>{getIcon(coinDetail?.market_data.price_change_percentage_7d)}</p>
          <p className="text-xl ">
            {coinDetail?.market_data.price_change_percentage_7d}%
          </p>
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
          {coinDetail?.market_data.high_24h.usd}
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
          {getSymbol(currentCurrency)} {coinDetail?.market_data.low_24h.usd}
        </p>
      </div>
    </div>
  );
}

export default CoinInfo;
