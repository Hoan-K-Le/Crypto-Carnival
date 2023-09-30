"use client";
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import { useAppSelector, AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchGraphData } from "@/app/store/ChartSelectorData";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const options = {
  responsive: true,
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
    "y-axis-3": {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
};

type InitialCoinProps = {
  name: string;
  current_price: number;
  prices: [];
  dates: number[];
  current_date: string;
  coin_name: string;
  gradientColor?: {
    start: string;
    end: string;
  };
  canvasGradient?: CanvasGradient;
};

const initialCoins: InitialCoinProps[] = [
  {
    name: "coinOne",
    current_price: 0,
    prices: [],
    current_date: "",
    dates: [],
    coin_name: "",
    gradientColor: {
      start: "rgba(116, 116, 242, 0.1)",
      end: "rgba(116, 116, 242, 0.01)",
    },
  },
  {
    name: "coinTwo",
    current_price: 0,
    prices: [],
    current_date: "",
    dates: [],
    coin_name: "",
    gradientColor: {
      start: "rgba(216, 120, 250, 0.1)",
      end: "rgba(216, 120, 250, 0.01)",
    },
  },
  {
    name: "coinThree",
    current_price: 0,
    prices: [],
    current_date: "",
    dates: [],
    coin_name: "",
    gradientColor: {
      start: "rgba(30, 213, 191, 0.1)",
      end: "rgba(145, 252, 228, 0.01)",
    },
  },
];

type CoinName = "coinOne" | "coinTwo" | "coinThree";

export default function LineChart() {
  const [coins, setCoins] = useState(initialCoins);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef();
  const currentCoin = [
    {
      coin: useAppSelector(state => state.coinOne.coinOne),
      symbol: useAppSelector(state => state.coinOne.symbol),
    },
    {
      coin: useAppSelector(state => state.coinTwo.coinTwo),
      symbol: useAppSelector(state => state.coinTwo.symbol),
    },
    {
      coin: useAppSelector(state => state.coinThree.coinThree),
      symbol: useAppSelector(state => state.coinThree.symbol),
    },
  ];

  const getCoinName = (index: number) => {
    return `${currentCoin[index].coin} (${currentCoin[index].symbol})`;
  };

  const fetchChartData = async (coin: any, index: number) => {
    try {
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: coin,
        })
      );
      if (!coin) return;
      if (fetchGraphData.fulfilled.match(chartData)) {
        const currentDate = new Date();
        const getCurrentData = chartData.payload.prices.filter(
          (price: [number, number]) => {
            const priceDate = new Date(price[0]);
            return currentDate.toDateString() === priceDate.toDateString();
          }
        );
        const prices = chartData.payload.prices.map(
          (price: [number, number]) => price[1]
        );
        const date = chartData.payload.prices.map(
          (price: [number, number]) => price[0]
        );

        setCoins(prevState =>
          prevState.map(c => {
            if (
              (!currentCoin[1].coin && c.name === "coinTwo") ||
              (!currentCoin[2].coin && c.name === "coinThree")
            ) {
              return {
                ...c,
                current_date: "",
                current_price: 0,
                dates: [],
                prices: [],
                coin_name: "",
              };
            }
            if (c.name === coins[index].name) {
              return {
                ...c,
                current_price: getCurrentData.length
                  ? getCurrentData[0][1]
                  : null,
                current_date: getCurrentData.length
                  ? getCurrentData[0][0]
                  : null,
                prices: prices,
                dates: date,
                coin_name: getCoinName(index),
              };
            }
            return c;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createGradient = (
    ctx: CanvasRenderingContext2D,
    start: string,
    end: string
  ) => {
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, start);
      gradient.addColorStop(1, end);
      return gradient;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const coinsForFetching: { coin: string; index: number }[] = [
        {
          coin: currentCoin[0].coin,
          index: 0,
        },
      ];
      if (currentCoin[1].coin) {
        coinsForFetching.push({
          coin: currentCoin[1].coin,
          index: 1,
        });
      }
      if (currentCoin[2].coin) {
        coinsForFetching.push({
          coin: currentCoin[2].coin,
          index: 2,
        });
      }

      for (const { coin, index } of coinsForFetching) {
        await fetchChartData(coin, index);
      }
    };
    fetchData();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      setCoins(prevState =>
        prevState.map(coin => {
          if (coin.gradientColor && ctx) {
            const gradient = createGradient(
              ctx,
              coin.gradientColor.start,
              coin.gradientColor.end
            );
            return {
              ...coin,
              canvasGradient: gradient,
            };
          }
          return coin;
        })
      );
    }
  }, [currentCurrency, ...currentCoin.map((coin, i) => coin.coin)]);

  const combinedDate = Array.from(
    new Set(coins.flatMap(coin => coin.dates))
  ).sort((a, b) => a - b);

  const data = {
    labels: combinedDate.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Coin One",
        data: coins.find(coin => coin.name === "coinOne")?.prices || [],
        borderColor: "#7878FA",

        backgroundColor:
          coins.find(coin => coin.name === "coinOne")?.canvasGradient ||
          "transparent",
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-1",
        order: 1,
      },
      {
        fill: true,
        label: "Coin Two",
        data: coins.find(coin => coin.name === "coinTwo")?.prices || [],
        borderColor: "#D878FA",
        backgroundColor:
          coins.find(coin => coin.name === "coinTwo")?.canvasGradient ||
          "transparent",
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-2",
        order: 2,
      },
      {
        fill: true,
        label: "Coin Three",
        data: coins.find(coin => coin.name === "coinThree")?.prices || [],
        borderColor: "#AFF83A",
        backgroundColor:
          coins.find(coin => coin.name === "coinThree")?.canvasGradient ||
          "transparent",
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-3",
        order: 3,
      },
    ],
  };

  return (
    <div className="w-full h-[400px] rounded-lg">
      {!currentCoin[1].coin && !currentCoin[2].coin ? (
        <div className="flex flex-col gap-2">
          <p className="text-xl text-[#191932] uppercase">
            {coins[0].coin_name}
          </p>
          <p className="text-3xl text-[#181825]">
            {coins[0].current_price.toFixed(2)}
          </p>
          <p>{new Date(coins[0].current_date).toDateString()}</p>
        </div>
      ) : (
        <p className="text-[#181825] text-3xl">
          {new Date(coins[0].current_date).toDateString()}
        </p>
      )}

      <Line ref={chartRef} data={data} options={options} />
      {(currentCoin[1].coin || currentCoin[2].coin) && (
        <div className="flex gap-10 mt-2">
          {coins.map((coin, i) =>
            coin.current_price !== 0 ? (
              <div className="flex items-center gap-2" key={coin.name}>
                <div
                  className={`h-[14px] w-[14px] rounded gap-2 ${
                    coin.name === "coinOne"
                      ? "bg-[#7878FA]"
                      : coin.name === "coinTwo"
                      ? "bg-[#D878FA]"
                      : coin.name === "coinThree"
                      ? "bg-green-300"
                      : ""
                  }`}
                ></div>
                <p className="flex items-center uppercase">{coin.coin_name}</p>
                <span className="text-[#424286]">
                  {coin.current_price.toFixed(2)}
                </span>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
