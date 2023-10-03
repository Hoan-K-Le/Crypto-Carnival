"use client";
import { useState, useEffect } from "react";

import { useAppSelector, AppDispatch } from "@/app/store/store";
import { TableDataProps } from "@/app/components/TableOverview/TableDataProps";
import Icon from "@/app/components/Icon/Icon";
import getSymbol from "@/app/utilities/symbol";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);
interface CoinType {
  id: string;
  image: string;
  symbol: string;
  current_price: number;
}

import { useDispatch } from "react-redux";
import { fetchGraphData } from "@/app/store/ChartSelectorData";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    "y-axis-1": {
      display: false,
      ticks: {
        display: false,
      },
    },
    "y-axis-2": {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
};

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
  const dispatch = useDispatch<AppDispatch>();
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const selectedCoins = useAppSelector(state => state.selectCoin);
  const coinsData = useAppSelector(state => state.coins.coins);
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
  });

  const fetchChartData = async (coin: any, index: number) => {
    try {
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: coin,
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

    selectedCoins.forEach(({ id }, index) => fetchChartData(id, index));
  }, [selectedCoins]);

  const coinToSell = swap ? selectedCoinsData[1] : selectedCoinsData[0];
  const coinToBuy = swap ? selectedCoinsData[0] : selectedCoinsData[1];

  const data = {
    labels: chartData.dates[0].map(date => new Date(date).getDate()), // assuming both coins have data for the same dates
    datasets: [
      {
        label: "Coin 1 Prices",
        data: chartData.prices[0],
        fill: false,
        borderColor: "#7878FA",
        yAxisID: "y-axis-1",
        pointRadius: 0,
      },
      {
        label: "Coin 2 Prices",
        data: chartData.prices[1],
        fill: false,
        borderColor: "#D878FA",
        yAxisID: "y-axis-2",
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="px-24">
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
                className="ml-auto border-b-2 pb-2"
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
      <div className=" gap-3 mt-16 h-[293px] bg-white uppercase p-4 rounded-xl w-full">
        <div className="flex gap-4 text-xl w-full mb-10">
          <span>
            {coinToSell?.id}({coinToSell?.symbol})
          </span>
          <span className="text-[#353570] text-opacity-60">To</span>
          <span>
            {coinToBuy?.id}({coinToBuy?.symbol})
          </span>
        </div>
        <div className="h-[174px] w-full">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* days of the graphs selector */}
      <div className=" mt-8 w-[463px]">
        <ul className="flex gap-4 justify-between px-4 py-2 rounded-xl bg-[#CCCCFA] bg-opacity-50">
          <li>1D</li>
          <li>7D</li>
          <li>14D</li>
          <li>1M</li>
          <li>1W</li>
          <li>1Y</li>
          <li>5Y</li>
        </ul>
      </div>
    </div>
  );
}

export default Converter;
