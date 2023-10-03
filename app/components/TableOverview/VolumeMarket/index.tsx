import React from "react";
import { TableDataProps } from "../TableDataProps";

interface VolumeMarketProps {
  coin: TableDataProps;
  formatNumber: (number: number) => string;
  symbol: string;
}

const VolumeMarket: React.FC<VolumeMarketProps> = ({
  coin,
  formatNumber,
  symbol,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <div
          className={`${
            coin?.price_change_percentage_24h_in_currency < 0
              ? "bg-[#FE2264]"
              : "bg-[#00B1A7]"
          } rounded-full h-[10px] w-[10px]`}
        ></div>
        <span>
          {symbol}
          {formatNumber(coin?.total_volume)}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <div
            className={`${
              coin?.price_change_percentage_24h_in_currency < 0
                ? "bg-[#FBBAD1]"
                : "bg-[#AFE5E5]"
            } rounded-full h-[10px] w-[10px]`}
          ></div>
          <span>
            {symbol}
            {formatNumber(coin?.market_cap_change_24h)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VolumeMarket;
