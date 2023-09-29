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
  coinOne: {
    current_price: number;
    prices: string;
    dates: number[];
    current_date: string;
  };
  coinTwo: {
    current_price: number;
    prices: string;
    dates: number[];
    current_date: string;
  };
  coinThree: {
    current_price: number;
    prices: string;
    dates: number[];
    current_date: string;
  };
};
const initialCoinValues = {
  coinOne: {
    current_price: 0,
    prices: "",
    current_date: "",
    dates: [],
  },
  coinTwo: {
    current_price: 0,
    prices: "",
    current_date: "",
    dates: [],
  },
  coinThree: {
    current_price: 0,
    prices: "",
    current_date: "",
    dates: [],
  },
};

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
  const [getCurrentDate, setGetCurrentDate] = useState<number | string>("");
  const [coins, setCoins] = useState<InitialCoinProps>(initialCoinValues);
  const [gradients, setGradients] = useState<GradientProps>(
    initialCoinGradient
  );
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useAppSelector(state => state.coinGraph.isLoading);
  const currentCoinOne = useAppSelector(state => state.coinOne.coinOne);
  const currentCoinOneSymbol = useAppSelector(state => state.coinOne.symbol);
  const currentCoinTwo = useAppSelector(state => state.coinTwo.coinTwo);
  const currentCoinTwoSymbol = useAppSelector(state => state.coinTwo.symbol);
  const currentCoinThree = useAppSelector(state => state.coinThree.coinThree);
  const currentCoinThreeSymbol = useAppSelector(
    state => state.coinThree.symbol
  );
  const chartRef = useRef();

  const fetchChartData = async (coin: any, coinName: CoinName) => {
    try {
      const initialCoin = coin;

      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: coin,
        })
      );
      if (!initialCoin) return;
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
        console.log(coinName, "ChartData:", chartData);
        setCoins(prevCoin => ({
          ...prevCoin,
          [coinName]: {
            ...prevCoin[coinName],
            current_price: getCurrentData.length ? getCurrentData[0][1] : null,
            current_date: getCurrentData.length ? getCurrentData[0][0] : null,
            prices: prices,
            dates: date,
          },
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const coinsForFetching: { coin: string; name: CoinName }[] = [
      {
        coin: currentCoinOne,
        name: "coinOne",
      },
      {
        coin: currentCoinTwo,
        name: "coinTwo",
      },
      {
        coin: currentCoinThree,
        name: "coinThree",
      },
    ];
    coinsForFetching.forEach(({ coin, name }) => {
      fetchChartData(coin, name);
    });

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
  const combinedDate = Array.from(
    new Set([
      ...coins.coinOne.dates,
      ...coins.coinTwo.dates,
      ...coins.coinThree.dates,
    ])
  ).sort((a, b) => a - b);

  const data = {
    labels: combinedDate.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Coin One",
        data: currentCoinOne ? coins.coinOne.prices : [],
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
        data: currentCoinTwo ? coins.coinTwo.prices : [],
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
        data: currentCoinThree ? coins.coinThree.prices : [],
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
      {currentCoinTwo ? (
        <>
          <Line ref={chartRef} data={data} options={options} />
          <div>
            <div className="flex">
              <p>
                {currentCoinOne} ({currentCoinOneSymbol})
              </p>
              <p>
                {coins.coinOne.current_price
                  ? coins.coinOne.current_price.toLocaleString()
                  : "loading"}{" "}
                mln
              </p>
            </div>
            <div className="flex">
              <p>
                {currentCoinTwo} ({currentCoinTwoSymbol})
              </p>
              <p>
                {coins.coinTwo.current_price
                  ? coins.coinTwo.current_price.toLocaleString()
                  : "loading"}{" "}
                mln
              </p>
            </div>
            {currentCoinThree && (
              <div className="flex">
                <p>
                  {currentCoinThree} ({currentCoinThreeSymbol})
                </p>
                <p>
                  {coins.coinThree.current_price
                    ? coins.coinThree.current_price.toLocaleString()
                    : "loading"}{" "}
                  mln
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-xl uppercase text-[#191932]">
              {currentCoinOne} ({currentCoinOneSymbol})
            </p>
            <p className="text-3xl text-[#181825]">
              {coins.coinOne.current_price
                ? Number(coins.coinOne.current_price).toLocaleString("en-US")
                : "Loading..."}
            </p>
            <p className="text-[#424286]">
              {coins.coinOne.current_price
                ? new Date(coins.coinOne.current_date).toDateString()
                : "Loading..."}
            </p>
          </div>

          {isLoading ? (
            <div>Linegraph Loading...</div>
          ) : (
            <Line ref={chartRef} data={data} options={options} />
          )}
        </>
      )}
    </div>
  );
}
