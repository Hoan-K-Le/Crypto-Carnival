"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/store/store";
import { TableDataProps } from "@/app/components/TableOverview/TableDataProps";
import Icon from "@/app/components/Icon/Icon";
import getSymbol from "@/app/utilities/symbol";

interface CoinType {
  id: string;
  image: string;
  symbol: string;
  current_price: number;
}
function Converter() {
  const [selectedCoinsData, setSelectedCoinsData] = useState<TableDataProps[]>(
    []
  );
  const [coinAmount, setCountAmount] = useState<string>("");
  const [swap, setIsSwap] = useState<boolean>(false);

  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const selectedCoins = useAppSelector(state => state.selectCoin);
  const coinsData = useAppSelector(state => state.coins.coins);

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
  });

  const handleSwap = () => {
    setIsSwap(!swap);
    setSelectedCoinsData(prevData => [...prevData.reverse()]);
  };

  const handleCoinAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountAmount(e.target.value);
  };

  const calculateCoin = (
    coinOnePrice: number,
    coinTwoPrice: number
  ): number => {
    return (Number(coinAmount) * coinOnePrice) / coinTwoPrice;
  };

  useEffect(() => {
    const fetchCoins = () => {
      try {
        const selectedCoinIds = selectedCoins.map(coin => coin.id);
        const getSelectedCoins = coinsData
          .filter(c => selectedCoinIds.includes(c.id))
          .slice(0, 2);
        setSelectedCoinsData(getSelectedCoins);
      } catch (err) {
        console.log(`ERROR IN CONVERT ${err}`);
      }
    };

    fetchCoins();
  }, [selectedCoins]);

  const coinToSell = swap ? selectedCoinsData[1] : selectedCoinsData[0];
  const coinToBuy = swap ? selectedCoinsData[0] : selectedCoinsData[1];

  return (
    <div className="px-24 pt-10">
      <div>
        <p className="text-xl mb-2">Online currency converter</p>
        <span>
          {currentDate.toLocaleDateString()} {currentTime}
        </span>
      </div>
      <div className="flex relative items-center mt-4 justify-between gap-4">
        {/* coin 1 */}
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-sm">You sell</p>
          <div key={coinToSell?.id} className="p-2">
            <div className="flex gap-2 border-b-2 border-[#353570] py-6 mb-4 items-center">
              <img
                className="w-[25px] h-[25px]"
                src={coinToSell?.image}
                alt={coinToSell?.id}
              />
              <p className="text-xl uppercase">
                {coinToSell?.id} ({coinToSell?.symbol})
              </p>
              <input
                className="ml-auto border-b-2"
                type="text"
                placeholder="How many coins"
                value={coinAmount}
                onChange={handleCoinAmount}
              />
            </div>
            <p className="uppercase text-sm">
              1 {coinToSell?.id} = {getSymbol(currentCurrency)}{" "}
              {coinToSell?.current_price}
            </p>
          </div>
        </div>
        {/* end of coin 1 */}
        <button
          onClick={handleSwap}
          className="absolute text-2xl text-white rounded-full p-2 bg-[#353570] right-0 left-0 mr-auto ml-auto"
        >
          <Icon iconVariant="converterSwap" />
        </button>
        {/* coin2 */}
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-sm">You buy</p>
          <div key={coinToBuy?.id} className="p-2">
            <div className="flex gap-2 border-b-2 border-[#353570] py-6 mb-4 items-center">
              <img
                className="w-[25px] h-[25px]"
                src={coinToBuy?.image}
                alt={coinToBuy?.id}
              />
              <p className="text-xl uppercase">
                {coinToBuy?.id} ({coinToBuy?.symbol})
              </p>
              <p className="ml-auto">
                {calculateCoin(
                  coinToSell?.current_price || 0,
                  coinToBuy?.current_price || 0
                )}
              </p>
            </div>
            <p className="uppercase text-sm">
              1 {coinToBuy?.id} = {getSymbol(currentCurrency)}{" "}
              {coinToBuy?.current_price}
            </p>
          </div>
        </div>
        {/* end of coin 2 */}
      </div>
    </div>
  );
}

export default Converter;
