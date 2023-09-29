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
  prices: string;
  dates: number[];
  current_date: string;
  coin_name: string;
};

const initialCoins: InitialCoinProps[] = [
  {
    name: "coinOne",
    current_price: 0,
    prices: "",
    current_date: "",
    dates: [],
    coin_name: "",
  },
  {
    name: "coinTwo",
    current_price: 0,
    prices: "",
    current_date: "",
    dates: [],
    coin_name: "",
  },
  {
    name: "coinThree",
    current_price: 0,
    prices: "",
    current_date: "",
    dates: [],
    coin_name: "",
  },
];

type GradientProps = {
  coinOne: {
    gradient: CanvasGradient | null;
  };
  coinTwo: {
    gradient: CanvasGradient | null;
  };
  coinThree: {
    gradient: CanvasGradient | null;
  };
};

const initialCoinGradient = {
  coinOne: {
    gradient: null,
  },
  coinTwo: {
    gradient: null,
  },
  coinThree: {
    gradient: null,
  },
};

type CoinName = "coinOne" | "coinTwo" | "coinThree";

export default function LineChart() {
  const [coins, setCoins] = useState(initialCoins);
  const [gradients, setGradients] = useState<GradientProps>(
    initialCoinGradient
  );
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const dispatch = useDispatch<AppDispatch>();
  const currentCoinOne = useAppSelector(state => state.coinOne.coinOne);
  const currentCoinOneSymbol = useAppSelector(state => state.coinOne.symbol);
  const currentCoinTwo = useAppSelector(state => state.coinTwo.coinTwo);
  const currentCoinTwoSymbol = useAppSelector(state => state.coinTwo.symbol);
  const currentCoinThree = useAppSelector(state => state.coinThree.coinThree);
  const currentCoinThreeSymbol = useAppSelector(
    state => state.coinThree.symbol
  );
  const chartRef = useRef();

  const getCoinName = (coinName: CoinName) => {
    switch (coinName) {
      case "coinOne":
        return `${currentCoinOne} (${currentCoinOneSymbol})`;
      case "coinTwo":
        return `${currentCoinTwo} (${currentCoinTwoSymbol})`;
      case "coinThree":
        return `${currentCoinThree} (${currentCoinThreeSymbol})`;
      default:
        return "";
    }
  };

  const fetchChartData = async (coin: any, coinName: CoinName) => {
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
            if (c.name === coinName) {
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
                coin_name: getCoinName(coinName),
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

  useEffect(() => {
    const fetchData = async () => {
      const coinsForFetching: { coin: string; name: CoinName }[] = [
        {
          coin: currentCoinOne,
          name: "coinOne",
        },
      ];

      if (currentCoinTwo) {
        coinsForFetching.push({
          coin: currentCoinTwo,
          name: "coinTwo",
        });
      }
      if (currentCoinThree) {
        coinsForFetching.push({
          coin: currentCoinThree,
          name: "coinThree",
        });
      }
      setCoins(prevState =>
        prevState.map(c =>
          (!currentCoinTwo && c.name === "coinTwo") ||
          (!currentCoinThree && c.name === "coinThree")
            ? {
                ...c,
                current_price: 0,
                prices: "",
                current_date: "",
                dates: [],
                coin_name: "",
              }
            : c
        )
      );

      for (const { coin, name } of coinsForFetching) {
        await fetchChartData(coin, name);
      }
    };
    fetchData();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      const gradientTwo = ctx.createLinearGradient(0, 0, 0, 400);
      const gradientThree = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(116, 116, 242, 0.1)");
      gradient.addColorStop(1, "rgba(116, 116, 242, 0.01)");
      gradientTwo.addColorStop(0, "rgba(216, 120, 250, 0.1)");
      gradientTwo.addColorStop(1, "rgba(216, 120, 250, 0.01)");
      gradientThree.addColorStop(0, "rgba(30, 213, 191, 0.1)");
      gradientThree.addColorStop(1, "rgba(145, 252, 228, 0.01)");
      setGradients(prevState => ({
        coinOne: {
          gradient: gradient,
        },
        coinTwo: {
          gradient: gradientTwo,
        },
        coinThree: {
          gradient: gradientThree,
        },
      }));
    }
  }, [currentCurrency, currentCoinOne, currentCoinTwo, currentCoinThree]);
  useEffect(() => {
    console.log(coins, "hello coins arr");
  }, [coins]);
  const combinedDate = Array.from(
    new Set(coins.flatMap(coin => coin.dates))
  ).sort((a, b) => a - b);

  const data = {
    labels: combinedDate.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Coin One",
        data: currentCoinOne
          ? coins.find(coin => coin.name === "coinOne")?.prices || []
          : [],
        borderColor: "#7878FA",
        backgroundColor: gradients.coinOne.gradient as CanvasGradient,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-1",
        order: 1,
      },
      {
        fill: true,
        label: "Coin Two",
        data: currentCoinTwo
          ? coins.find(coin => coin.name === "coinTwo")?.prices || []
          : [],
        borderColor: "#D878FA",
        backgroundColor: gradients.coinTwo.gradient as CanvasGradient,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-2",
        order: 2,
      },
      {
        fill: true,
        label: "Coin Three",
        data: currentCoinThree
          ? coins.find(coin => coin.name === "coinThree")?.prices || []
          : [],
        borderColor: "#AFF83A",
        backgroundColor: gradients.coinThree.gradient as CanvasGradient,
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
      {!currentCoinTwo && !currentCoinThree ? (
        <div className="flex flex-col gap-2">
          <p className="text-xl text-[#191932]">{coins[0].coin_name}</p>
          <p className="text-3xl text-[#181825]">{coins[0].current_price}</p>
          <p>{new Date(coins[0].current_date).toDateString()}</p>
        </div>
      ) : (
        <p className="text-[#181825] text-3xl">
          {new Date(coins[0].current_date).toDateString()}
        </p>
      )}

      <Line ref={chartRef} data={data} options={options} />
      {(currentCoinTwo || currentCoinThree) && (
        <div className="flex gap-10 mt-2">
          {coins.map((coin, i) =>
            coin.current_price !== 0 && coin.prices !== "" ? (
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
                <p className="flex items-center">
                  {coin.coin_name.toUpperCase()}
                </p>
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
