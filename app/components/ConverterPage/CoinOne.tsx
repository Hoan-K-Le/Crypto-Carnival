import React from "react";

type CoinOneProps = {
  coin: { id: string; symbol: string; image: string; current_price: number };
  coinAmount: string;
  title: string;
  handleCoinAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol: string;
};

function CoinOne({
  coin,
  title,
  coinAmount,
  handleCoinAmount,
  currencySymbol,
}: CoinOneProps) {
  return (
    <div className="p-5 bg-white rounded-2xl w-full">
      <p className="text-sm">You sell</p>
      <div key={coin?.id} className="p-2">
        <div className="flex gap-2 border-b-2 border-[#353570] py-6 mb-4 items-center">
          <img className="w-[25px] h-[25px]" src={coin?.image} alt={coin?.id} />
          <p className="text-xl uppercase">
            {coin?.id} ({coin?.symbol})
          </p>
          <input
            className="ml-auto border-b-2 pb-2"
            type="text"
            placeholder="How many coins"
            value={coinAmount}
            onChange={handleCoinAmount}
          />
        </div>
        <p className="uppercase text-sm">
          1 {coin?.id} = {currencySymbol} {coin?.current_price}
        </p>
      </div>
    </div>
  );
}

export default CoinOne;
