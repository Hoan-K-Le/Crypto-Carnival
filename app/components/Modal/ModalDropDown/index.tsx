import { useState } from "react";
import Icon from "../../Icon/Icon";

type CoinSelectionProps = {
  name: string;
  handleSelectCoin: (
    event: React.MouseEvent<HTMLButtonElement>,
    coidId: string
  ) => void;
  coins: any;
  handleViewCoins: (event: React.MouseEvent<HTMLDivElement>) => void;
  dropDownCoinSelection: boolean;
};

function CoinSelectionList({
  name,
  handleSelectCoin,
  coins,
  handleViewCoins,
  dropDownCoinSelection,
}: CoinSelectionProps) {
  return (
    <div
      onClick={handleViewCoins}
      className="cursor-pointer select-none py-2 px-4 relative border rounded-xl flex justify-between w-full items-center"
    >
      <p className="w-full text-left">{name ? name : "Select Coin"}</p>
      <Icon iconVariant="arrowDown" />
      <div
        className={`absolute ${
          dropDownCoinSelection ? "flex" : "hidden"
        }  bg-white bg-opacity-70 rounded-xl top-10 left-0 right-0 text-center flex-col justify-between overflow-y-auto h-[100px]`}
      >
        {coins?.map((coin: { id: string; name: string }) => (
          <button
            onClick={e => handleSelectCoin(e, coin?.id)}
            key={coin.id}
            value={coin?.name}
          >
            {coin?.id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CoinSelectionList;
