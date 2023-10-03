import React from "react";

export const ProgressBar = ({ progressBar, coin }: any) => {
  return (
    <div
      className={`w-full h-[10px] rounded-xl ${
        coin?.price_change_percentage_24h_in_currency < 0
          ? "bg-[#FBBAD1]"
          : "bg-[#AFE5E5]"
      } `}
    >
      <div
        className={`h-[10px] rounded-xl ${
          coin?.price_change_percentage_24h_in_currency < 0
            ? "bg-[#FE2264]"
            : "bg-[#00B1A7] "
        }  `}
        style={{
          width: `${progressBar(coin?.total_volume, coin?.market_cap) || 0}%`,
        }}
      ></div>
    </div>
  );
};
export default ProgressBar;
