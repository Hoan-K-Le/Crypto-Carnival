import React from "react";
import { TableDataProps } from "../TableDataProps";
import { useAppSelector } from "@/app/store/store";

interface CirculatingSupplyProps {
  coin: TableDataProps;
  formatNumber: (number: number) => string;
  symbol: string;
}

const CirculatingSupply: React.FC<CirculatingSupplyProps> = ({
  symbol,
  formatNumber,
  coin,
}) => {
  const getAverageData = (data: number, bg1: string, bg2: string): string => {
    return data < 0 ? `bg-[#${bg1}]` : `bg-[#${bg2}]`;
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <div
          className={`
           ${getAverageData(
             coin?.price_change_percentage_24h_in_currency,
             "FE2264",
             "00B1A7"
           )}
          rounded-full h-[10px] w-[10px]`}
        ></div>
        <span className="flex items-center">
          {symbol}
          {formatNumber(coin?.circulating_supply)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div
          className={`
           ${getAverageData(
             coin?.price_change_percentage_24h_in_currency,
             "FBBAD1",
             "AFE5E5"
           )}
         rounded-full h-[10px] w-[10px]`}
        ></div>
        <span>
          {symbol}
          {coin?.total_supply !== null
            ? formatNumber(coin?.total_supply)
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default CirculatingSupply;
