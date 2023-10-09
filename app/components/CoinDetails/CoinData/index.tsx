import React from "react";
import getSymbol from "@/app/utilities/symbol";
import { useAppSelector } from "@/app/store/store";

type CoinDetailData = {
  coinDetail: {
    symbol: string;
    market_data: {
      total_volume: { btc: number; usd: number };
      market_cap: { usd: number };
      total_supply: number;
      circulating_supply: number;
      fully_diluted_valuation: { usd: number };
      price_change_percentage_24h: number;
    };
  };
};

function CoinDetailData({ coinDetail }: CoinDetailData) {
  const currentCurrency = useAppSelector(state => state.currency.currencies);

  const progressBar = (dataOne: number, dataTwo: number): string => {
    const result = (dataOne / dataTwo) * 100;
    return result.toString();
  };
  const getAverageData = (data: number, bg1: string, bg2: string): string => {
    return data < 0 ? `bg-[#${bg1}]` : `bg-[#${bg2}]`;
  };
  const volumeMarketAvg = (dataOne: number, dataTwo: number): number => {
    return (dataOne / dataTwo) * 100;
  };
  return (
    <>
      <div className="flex gap-5 mt-7 ">
        <div className="flex gap-2 w-full">
          <div className="bg-white shadow px-6 py-10  flex flex-col gap-4 w-full rounded-xl">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
                  +
                </p>
                <p>Total volume</p>
              </div>
              <p className="text-xl uppercase">
                {coinDetail?.market_data.total_volume.btc} {coinDetail?.symbol}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
                  +
                </p>
                <p>Volume 24H</p>
              </div>
              <p className="text-xl uppercase">
                {getSymbol(currentCurrency)}
                {coinDetail?.market_data.total_volume.usd}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
                  +
                </p>
                <p>Volume/Market</p>
              </div>
              <p className="text-xl">
                {(
                  coinDetail?.market_data.total_volume.usd /
                  coinDetail?.market_data.market_cap.usd
                ).toFixed(4)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl w-full flex flex-col gap-4 px-6 py-10">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
                +
              </p>
              <p>Market Supply</p>
            </div>
            <p className="text-xl uppercase">
              {coinDetail?.market_data.total_supply.toLocaleString("en-US")}{" "}
              {coinDetail?.symbol}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
                +
              </p>
              <p>Circulating Supply</p>
            </div>
            <p className="text-xl uppercase">
              {" "}
              {coinDetail?.market_data.circulating_supply.toLocaleString(
                "en-US"
              )}{" "}
              {coinDetail?.symbol}
            </p>
          </div>
          {/* edit here */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <div
                className={`
           ${getAverageData(
             coinDetail?.market_data.price_change_percentage_24h,
             "FE2264",
             "00B1A7"
           )}
          rounded-full h-[10px] w-[10px]`}
              ></div>
              <span className="flex items-center">
                {volumeMarketAvg(
                  coinDetail?.market_data.total_volume.usd,
                  coinDetail?.market_data.market_cap.usd
                ).toFixed(2)}
                %
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`
           ${getAverageData(
             coinDetail?.market_data.price_change_percentage_24h,
             "FBBAD1",
             "AFE5E5"
           )}
         rounded-full h-[10px] w-[10px]`}
              ></div>
              <span>
                {Math.abs(
                  volumeMarketAvg(
                    coinDetail?.market_data.total_volume.usd,
                    coinDetail?.market_data.market_cap.usd
                  ) - 100
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={`w-full h-[10px] rounded-xl  ${
              coinDetail?.market_data.price_change_percentage_24h < 0
                ? "bg-[#FBBAD1]"
                : "bg-[#AFE5E5]"
            } `}
          >
            <div
              className={`h-[10px] rounded-xl ${
                coinDetail?.market_data.price_change_percentage_24h < 0
                  ? "bg-[#FE2264]"
                  : "bg-[#00B1A7] "
              }  `}
              style={{
                width: `${progressBar(
                  coinDetail?.market_data.total_volume.usd,
                  coinDetail?.market_data.market_cap.usd
                ) || 0}%`,
              }}
            ></div>
          </div>
          {/* end edit */}
        </div>
      </div>
      <div className="bg-white shadow px-6 py-10 flex flex-col gap-4 rounded-xl mt-4 w-[48.5%]  mr-4">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2">
            <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
              +
            </p>
            <p>Market Cap</p>
          </div>
          <p className="text-xl">
            {getSymbol(currentCurrency)}
            {coinDetail?.market_data.market_cap.usd.toLocaleString("en-US")}
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2">
            <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
              +
            </p>
            <p>Fully Diluted Valuation</p>
          </div>
          <p className="text-xl">
            {getSymbol(currentCurrency)}
            {coinDetail?.market_data.fully_diluted_valuation.usd.toLocaleString(
              "en-US"
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default CoinDetailData;
