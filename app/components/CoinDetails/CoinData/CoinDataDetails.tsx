import React from "react";
import { CoinDetailProps } from "@/app/types/coin_detail";

function CoinDataDetails({
  title,
  data,
  symbol,
  frontSymbol,
}: {
  title: string;
  data: number | string;
  symbol?: string;
  frontSymbol?: boolean;
}) {
  const displayData =
    frontSymbol === true ? `${symbol}${data}` : `${data}${symbol}`;

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <p className="h-[20px] w-[20px] text-lg flex items-center justify-center rounded-full shadow bg-slate-100 border">
          +
        </p>
        <p>{title}</p>
      </div>
      <p className="text-xl uppercase">{displayData}</p>
    </div>
  );
}

export default CoinDataDetails;
