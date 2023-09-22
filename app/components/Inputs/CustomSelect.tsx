"use client";
import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import { useAppSelector } from "@/app/store/store";
import { updateSelectedCurrency } from "@/app/store/CurrencyReducer";
import { useDispatch } from "react-redux";
import { fetchCoins } from "@/app/store/CoinsData";

export default function CustomSelect() {
  const [display, setDisplay] = useState<boolean>(false);
  const [currencyList, setCurrencyList] = useState<string[]>([
    "usd",
    "eur",
    "gbp",
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const dispatch = useDispatch<AppDispatch>();
  const currentData = useAppSelector(state => state.coins.coins);
  const handleChange = () => {
    setDisplay(prevState => !prevState);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    dispatch(updateSelectedCurrency(currency));
    setDisplay(false);
  };

  useEffect(() => {
    dispatch(fetchCoins(selectedCurrency));
    console.log("whatver");
  }, [selectedCurrency]);

  return (
    <div className="relative">
      <div className="bg-[#CCCCFA] dark:bg-[#191925] dark:bg-opacity-50 bg-opacity-40  py-2.5 px-3 rounded-lg relative z-10">
        <button
          onClick={handleChange}
          className="flex items-center gap-2 text-[#424286] dark:text-[#FFFFFF] dark:text-opacity-50 tracking-wide font-light"
        >
          <div className="bg-slate900 dark:bg-[#FFFFFF] p-1 rounded-full">
            <Icon
              iconVariant="dollar"
              className="text-green200 dark:text-black text-xs"
            />
          </div>
          {selectedCurrency}
          <Icon
            iconVariant="chevDown"
            className="dark:text-white dark:text-opacity-70"
          />
        </button>
      </div>
      <div
        className={`absolute w-full right-0 rounded-lg top-full ${
          display ? "" : "hidden"
        } z-20`}
      >
        <ul className="text-center bg-opacity-40  bg-[#CCCCFA] rounded-b-lg shadow-md">
          {currencyList.length > 0 &&
            currencyList.map(currency => (
              <li key={`curr${currency}`}>
                <button
                  className="font-light text-[#424286]"
                  value={currency}
                  onClick={() => handleCurrencyChange(currency)}
                >
                  {currency.toUpperCase()}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
