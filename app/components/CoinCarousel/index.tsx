import React, { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import getSymbol from "@/app/utilities/symbol";
import getAvg from "@/app/utilities/getAvg";
import Icon from "../Icon/Icon";
import { useDispatch } from "react-redux";
import {
  updateSelectedCoinOne,
  updateSelectCoinOneSymbol,
  updateSelectedCoinTwo,
  updateSelectCoinTwoSymbol,
  updateSelectedCoinThree,
  updateSelectCoinThreeSymbol,
} from "@/app/store/SelectCoinReducer";
const CoinCarousel = () => {
  const [selectCoin, setSelectCoin] = useState<any>([]);
  const coinsData = useAppSelector(state => state.coins.coins);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const dispatch = useDispatch<AppDispatch>();
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
    let newSelectCoin = [...selectCoin];
    if (newSelectCoin.includes(coin)) {
      newSelectCoin = newSelectCoin.filter(c => c !== coin);
    } else if (newSelectCoin.length < 3) {
      newSelectCoin.push(coin);
    }
    setSelectCoin(newSelectCoin);
    dispatch(updateSelectedCoinOne(newSelectCoin[0]?.id || ""));
    dispatch(updateSelectCoinOneSymbol(newSelectCoin[0]?.symbol || ""));
    dispatch(updateSelectedCoinTwo(newSelectCoin[1]?.id || ""));
    dispatch(updateSelectCoinTwoSymbol(newSelectCoin[1]?.symbol || ""));
    dispatch(updateSelectedCoinThree(newSelectCoin[2]?.id || ""));
    dispatch(updateSelectCoinThreeSymbol(newSelectCoin[2]?.symbol || ""));
  };

  const matchCoin = (coin: object) => {
    return selectCoin.includes(coin)
      ? "bg-carousel bg-opacity-50"
      : selectCoin.length < 3
      ? "bg-white"
      : "bg-gray-300";
  };

  useEffect(() => {}, [coinsData, selectCoin]);
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
        {coinsData?.map((coin, index) => (
          <div key={coin.id} className="flex-shrink-0 p-2">
            <div
              onClick={() => handleCoinClick(coin)}
              className={`${matchCoin(
                coin
              )} flex items-center cursor-pointer rounded-xl  shadow-md px-5 py-3 gap-3`}
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
                    {coin.current_price ? coin.current_price.toFixed(2) : 1}
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
                    {coin.price_change_percentage_24h_in_currency
                      ? coin.price_change_percentage_24h_in_currency.toFixed(2)
                      : 1}
                    %
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
