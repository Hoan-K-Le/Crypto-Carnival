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
} from "@/app/store/SelectCoinReducer";
const CoinCarousel = () => {
  const [selectCoin, setSelectCoin] = useState<any>([]);
  const coinsData = useAppSelector(state => state.coins.coins);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const currentCoin = useAppSelector(state => state.coinOne.coinOne);
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
    if (selectCoin.includes(coin)) {
      setSelectCoin(selectCoin.filter((c: any) => c !== coin));
    } else {
      if (selectCoin.length >= 2) {
        setSelectCoin([selectCoin[1], coin]);
        dispatch(updateSelectedCoinOne(selectCoin[1].id));
        dispatch(updateSelectCoinOneSymbol(selectCoin[1].symbol));
      } else {
        const newSelectCoin = [...selectCoin, coin];
        setSelectCoin(newSelectCoin);
        dispatch(updateSelectedCoinOne(newSelectCoin[0].id));
        dispatch(updateSelectCoinOneSymbol(newSelectCoin[0].symbol));
      }
    }
  };

  const matchCoin = (coin: any) => {
    return selectCoin.includes(coin) ? "bg-carousel bg-opacity-50" : "bg-white";
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
