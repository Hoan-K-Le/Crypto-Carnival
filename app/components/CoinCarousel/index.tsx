import React, { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useAppSelector } from "@/app/store/store";
import getSymbol from "@/app/utilities/symbol";
import getAvg from "@/app/utilities/getAvg";
import Icon from "../Icon/Icon";

const CoinCarousel = () => {
  const [selectCoin, setSelectCoin] = useState<any>([]);
  const coinsData = useAppSelector(state => state.coins.coins);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  useEffect(() => {}, [coinsData]);
  // console.log(coinsData);
  // console.log(selectCoin);
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft -= slider.clientWidth;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft += slider.clientWidth;
    }
  };
  const handleCoinClick = (coin: any) => {
    if (selectCoin.includes(coin)) {
      setSelectCoin(selectCoin.filter((c: any) => c !== coin));
    } else {
      if (selectCoin.length >= 2) {
        setSelectCoin([selectCoin[1], coin]);
      } else {
        setSelectCoin([...selectCoin, coin]);
      }
    }
  };

  const matchCoin = (coin: any) => {
    return selectCoin.includes(coin) ? "bg-carousel bg-opacity-50" : "";
  };
  console.log(selectCoin);
  return (
    <div className="relative flex items-center mb-5">
      <MdChevronLeft
        className="opacity-50 -left-9 rounded-full bg-[#7878FA] text-white absolute cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={40}
      />
      <div
        id="slider"
        className="flex overflow-hidden scroll-smooth scrollbar-hide"
      >
        {coinsData.map((coin, index) => (
          <div key={coin.id} className="flex-shrink-0 p-2">
            <div
              onClick={() => handleCoinClick(coin)}
              className={`${matchCoin(
                coin
              )} flex items-center cursor-pointer rounded-xl bg-white shadow-md px-5 py-3 gap-3`}
            >
              <img
                src={coin.image}
                alt="coin-logo"
                className="w-[30px] h-[30px]"
              />
              <div>
                <p>{coin.name}</p>
                <div className={`flex items-center gap-3`}>
                  <span className="text-[#424286] text-opacity-80">
                    {coin.current_price.toFixed(2)}
                    {getSymbol(currentCurrency)}
                  </span>
                  <span
                    className={`flex items-center gap-1 ${getAvg(
                      coin.price_change_percentage_24h_in_currency
                    )}`}
                  >
                    {coin.price_change_percentage_24h_in_currency < 0 ? (
                      <Icon iconVariant="arrowDown" />
                    ) : (
                      <Icon iconVariant="arrowUp" />
                    )}
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MdChevronRight
        className="opacity-50 absolute -right-11 bg-[#7878FA] rounded-full text-white cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={40}
      />
    </div>
  );
};

export default CoinCarousel;
