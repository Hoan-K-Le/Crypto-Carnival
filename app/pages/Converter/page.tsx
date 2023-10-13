"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { TableDataProps } from "@/app/components/TableOverview/TableDataProps";
import Icon from "@/app/components/Icon/Icon";
import { fetchGraphData } from "@/app/store/ChartSelectorData";
import getSymbol from "@/app/utilities/symbol";
import CoinOne from "@/app/components/ConverterPage/CoinOne";
import CoinTwo from "@/app/components/ConverterPage/CoinTwo";
import LineGraph from "@/app/components/ConverterPage/LineGraph";
import CoinsConverter from "@/app/components/CoinsConverter";
import DisplayDaysInterval from "@/app/components/DisplayDaysInterval";
import { getDaily } from "@/app/utilities/getDaily";

function Converter() {
  const [selectedCoinsData, setSelectedCoinsData] = useState<TableDataProps[]>(
    []
  );
  const [chartData, setChartData] = useState<{
    prices: number[][];
    dates: string[][];
  }>({
    prices: [[], []],
    dates: [[], []],
  });
  const [coinAmount, setCountAmount] = useState<string>("");
  const [swap, setIsSwap] = useState<boolean>(false);
  const [days, setDays] = useState<string[]>(["1", "7", "14", "30", "max"]);
  const [selectedDays, setSelectedDays] = useState<string>("7");
  const dispatch = useDispatch<AppDispatch>();
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const selectedCoins = useAppSelector(state => state.selectCoin);
  const coinsData = useAppSelector(state => state.coins.coins);
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
  });

  const fetchChartData = async (coin: string, index: number) => {
    try {
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: coin,
          days: selectedDays,
          daily: getDaily(selectedDays),
        })
      );
      const prices = chartData.payload.prices.map(
        (price: [number, number]) => price[1]
      );
      const date = chartData.payload.prices.map(
        (price: [number, number]) => price[0]
      );
      setChartData(prevData => ({
        ...prevData,
        prices: {
          ...prevData.prices,
          [index]: prices,
        },
        dates: {
          ...prevData.dates,
          [index]: date,
        },
      }));
    } catch (err) {
      console.log(`ERROR FETCHCHARTDATA ON CONVERTER ${err}`);
    }
  };

  const handleSelectDay = (day: string) => {
    setSelectedDays(day);
  };

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
    const fetchCoins = async () => {
      try {
        const selectedCoinIds = selectedCoins.map(coin => coin.id);
        const getSelectedCoins = coinsData
          .filter(c => selectedCoinIds.includes(c.id))
          .slice(0, 2);
        setSelectedCoinsData(getSelectedCoins);
        const fetchPromsies = getSelectedCoins.map(async ({ id }, index) => {
          try {
            return await fetchChartData(id, index);
          } catch (err) {
            console.log(`ERROR IN FETCHPROMISE CONVERT PAGE ${err}`);
          }
        });
        await Promise.all(fetchPromsies);
      } catch (err) {
        console.log(`ERROR IN CONVERT ${err}`);
      }
    };
    fetchCoins();
  }, [selectedCoins, selectedDays]);

  const coinToSell = swap ? selectedCoinsData[1] : selectedCoinsData[0];
  const coinToBuy = swap ? selectedCoinsData[0] : selectedCoinsData[1];

  return (
    <div>
      <CoinsConverter />
      <div className="px-24">
        <div>
          <p className="text-xl mb-2">Online currency converter</p>
          <span>
            {currentDate.toLocaleDateString()} {currentTime}
          </span>
        </div>
        <div className="flex relative items-center mt-4 justify-between gap-4">
          <CoinOne
            coin={coinToSell}
            coinAmount={coinAmount}
            title="You Sell"
            handleCoinAmount={handleCoinAmount}
            currencySymbol={getSymbol(currentCurrency)}
          />
          <button
            onClick={handleSwap}
            className="absolute text-2xl text-white rounded-full p-2 bg-[#353570] right-0 left-0 mr-auto ml-auto"
          >
            <Icon iconVariant="converterSwap" />
          </button>
          <CoinTwo
            coin={coinToBuy}
            title="You buy"
            currencySymbol={getSymbol(currentCurrency)}
            coinAvg={() =>
              calculateCoin(
                coinToSell?.current_price || 0,
                coinToBuy?.current_price || 0
              )
            }
          />
        </div>
        <LineGraph
          coinToSell={coinToSell}
          coinToBuy={coinToBuy}
          chartData={chartData}
          selectedDays={selectedDays}
        />
        <DisplayDaysInterval
          days={days}
          selectedDays={selectedDays}
          handleSelectDay={handleSelectDay}
        />
      </div>
    </div>
  );
}

export default Converter;
