import React from "react";

type CoinTwoProps = {
  coin: { id: string; symbol: string; image: string; current_price: number };
  title: string;
  coinAvg: () => number;
  currencySymbol: string;
};

function CoinTwo({ coin, currencySymbol, coinAvg, title }: CoinTwoProps) {
  return (
    <div className="p-5 bg-white rounded-2xl w-full">
      <p className="text-sm">{title}</p>
      <div key={coin?.id} className="p-2">
        <div className="flex gap-2 border-b-2 border-[#353570] py-6 mb-4 items-center">
          <img className="w-[25px] h-[25px]" src={coin?.image} alt={coin?.id} />
          <p className="text-xl uppercase">
            {coin?.id} ({coin?.symbol})
          </p>
          <p className="ml-auto">{coinAvg()}</p>
        </div>
        <p className="uppercase text-sm">
          1 {coin?.id} = {currencySymbol} {coin?.current_price}
        </p>
      </div>
    </div>
  );
}

export default CoinTwo;
