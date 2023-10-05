"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, BarElement } from "chart.js";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchGraphData } from "@/app/store/ChartSelectorData";
import getSymbol from "@/app/utilities/symbol";
ChartJS.register(CategoryScale, BarElement);
import { formatNumber } from "@/app/utilities/formatNumber";

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

type ChartData = {
  labels: (number | string)[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    yAxisID: string;
    order: number;
    backgroundColor: any;
  }[];
};

type InitialCoinProps = {
  name: string;
  current_price: number;
  prices: number[];
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
      start: "rgba(116, 116, 242, 0.6)",
      end: "rgba(116, 116, 242, 1)",
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
      start: "rgba(216, 120, 250,0.6)",
      end: "rgba(216, 120, 250, 1)",
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
      start: "rgba(30, 213, 191,1)",
      end: "rgba(145, 252, 228, 1)",
    },
  },
];

type BarChartProps = {
  selectedDay: string;
};

export default function BarChart({ selectedDay }: BarChartProps) {
  const [coins, setCoins] = useState(initialCoins);
  const dispatch = useDispatch<AppDispatch>();
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const currentCoins = useAppSelector(state => state.selectCoin);

  const getCoinName = (index: number) => {
    return `${currentCoins[index].id} (${currentCoins[index].symbol})`;
  };

  const chartRef = useRef();

  const fetchChartData = async (coin: string, index: number) => {
    if (!currentCoins[0]) return;
    try {
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: coin,
          days: selectedDay,
          daily: selectedDay === "1" ? "" : "daily",
        })
      );
      if (!coin) return;
      if (fetchGraphData.fulfilled.match(chartData)) {
        const currentDate = new Date();
        const getCurrentData = chartData.payload.total_volumes.filter(
          (volumeData: [number, number]) => {
            const volumeDate = new Date(volumeData[0]);
            return currentDate.toDateString() === volumeDate.toDateString();
          }
        );
        const volume = chartData.payload.total_volumes.map(
          (volume: [number, number]) => volume[1]
        );
        const date = chartData.payload.total_volumes.map(
          (volumeDate: [number, number]) => volumeDate[0]
        );

        setCoins(prevState =>
          prevState.map((c, idx) => {
            const currentCoin = currentCoins[idx];
            const isMissing = !currentCoin || !currentCoin.id;
            const matchingCoin = c.name === coins[index].name;
            const defaultCoinData = {
              current_date: "",
              current_price: 0,
              dates: [],
              prices: [],
              coin_name: "",
            };
            const updatedCoinData = {
              current_price: getCurrentData.length
                ? getCurrentData[0][1]
                : null,
              current_date: getCurrentData.length ? getCurrentData[0][0] : null,
              prices: volume,
              dates: date,
              coin_name: getCoinName(index),
            };

            if (isMissing)
              return { ...c, ...defaultCoinData } as InitialCoinProps;
            if (matchingCoin)
              return {
                ...c,
                ...updatedCoinData,
              } as InitialCoinProps;

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
      if (!currentCoins[0]) return;
      const coinsForFetching: {
        coin: string;
        index: number;
      }[] = [
        {
          coin: currentCoins[0].id,
          index: 0,
        },
      ];
      for (let i = 1; i <= 2; i++) {
        if (currentCoins[i] && currentCoins[i].id) {
          coinsForFetching.push({
            coin: currentCoins[i].id,
            index: i,
          });
        }
      }
      const fetchPromises = coinsForFetching.map(({ coin, index }) =>
        fetchChartData(coin, index)
      );
      try {
        await Promise.all(fetchPromises);
      } catch (err) {
        console.log(`ERROR ON FETCHPROMISES ${err}`);
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
  }, [currentCurrency, currentCoins, selectedDay]);

  const combinedDate = Array.from(
    new Set(coins.flatMap(coin => coin.dates))
  ).sort((a, b) => a - b);

  const data: ChartData = {
    labels:
      selectedDay === "1"
        ? coins[0]?.dates.map(date =>
            new Date(date).toLocaleTimeString("en-US", { hour12: true })
          )
        : coins[0]?.dates.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Coin One",
        data: coins.find(coin => coin.name === "coinOne")?.prices || [],
        backgroundColor: "rgba(116, 116, 242, 0.6)",
        yAxisID: "y-axis-1",
        order: 1,
      },
      {
        fill: true,
        label: "Coin Two",
        data: coins.find(coin => coin.name === "coinTwo")?.prices || [],
        backgroundColor: "rgba(216, 120, 250,0.6)",
        yAxisID: "y-axis-2",
        order: 2,
      },
      {
        fill: false,
        label: "Coin Three",
        data: coins.find(coin => coin.name === "coinThree")?.prices || [],
        backgroundColor: "rgba(145, 252, 228, 0.6)",
        yAxisID: "y-axis-3",
        order: 3,
      },
    ],
  };

  return (
    <div className="w-full rounded-lg">
      {!coins[1]?.current_price && !coins[2]?.current_price ? (
        <div className="flex flex-col gap-2">
          <p className="text-[#191932] text-xl uppercase">Volume 24H</p>
          <p className="text-3xl text-[#181825] font-bold flex items-center">
            {getSymbol(currentCurrency)} {coins[0]?.current_price.toFixed(2)}
          </p>
          <p className="text-[#424286]">
            {new Date(coins[0]?.current_date).toDateString()}
          </p>
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      ) : (
        <div className="w-full ">
          <p className="text-[#181825] text-3xl py-9">
            {new Date(coins[0]?.current_date).toDateString()}
          </p>
          <Bar ref={chartRef} data={data} options={options} />
          <div className="flex justify-between gap-10 mt-2">
            {coins.map(
              (coin, i) =>
                coin?.current_price !== 0 && (
                  <div
                    key={coin?.coin_name}
                    className="flex items-center gap-2"
                  >
                    <div className={`h-[14px] w-[14px] rounded gap-2`} />
                    <p className="uppercase">{coin?.coin_name}</p>
                    <span className="text-[#424286] flex items-center">
                      {getSymbol(currentCurrency)}{" "}
                      {formatNumber(coin?.current_price)}
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
