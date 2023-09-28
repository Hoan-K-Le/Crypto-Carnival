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

export default function LineChart() {
  const [coinOnePrice, setCoinOnePrice] = useState<number[]>([]);
  const [coinTwoPrice, setCoinTwoPrice] = useState<number[]>([]);
  const [coinThreePrice, setCoinThreePrice] = useState<number[]>([]);
  const [coinOnePriceDates, setCoinOnePriceDates] = useState<number[]>([]);
  const [coinTwoPriceDates, setCoinTwoPriceDates] = useState<number[]>([]);
  const [coinThreePriceDates, setCoinThreePriceDates] = useState<number[]>([]);
  const [currentPriceOne, setCurrentPriceOne] = useState<number | null>(null);
  const [currentPriceTwo, setCurrentPriceTwo] = useState<number | null>(null);
  const [currentPriceThree, setCurrentPriceThree] = useState<number | null>(
    null
  );
  const [getCurrentDate, setGetCurrentDate] = useState<number | string>("");

  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const [
    gradientBackground,
    setGradientBackground,
  ] = useState<CanvasGradient | null>(null);
  const [
    gradientBackgroundTwo,
    setGradientBackgroundTwo,
  ] = useState<CanvasGradient | null>(null);
  const [
    gradientBackgroundThree,
    setGradientBackgroundThree,
  ] = useState<CanvasGradient | null>(null);
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
  const fetchChartData = async (
    coin: any,
    setPrice: any,
    setPriceDates: any,
    setCurrentPrice: any
  ) => {
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
        setCurrentPrice(getCurrentData.length ? getCurrentData[0][1] : null);
        setGetCurrentDate(getCurrentData.length ? getCurrentData[0][0] : null);
        setPrice(prices);
        setPriceDates(date);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData(
      currentCoinOne,
      setCoinOnePrice,
      setCoinOnePriceDates,
      setCurrentPriceOne
    );
    fetchChartData(
      currentCoinTwo,
      setCoinTwoPrice,
      setCoinTwoPriceDates,
      setCurrentPriceTwo
    );
    fetchChartData(
      currentCoinThree,
      setCoinThreePrice,
      setCoinThreePriceDates,
      setCurrentPriceThree
    );
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
      setGradientBackground(gradient);
      setGradientBackgroundTwo(gradientTwo);
      setGradientBackgroundThree(gradientThree);
    }
  }, [currentCurrency, currentCoinOne, currentCoinTwo, currentCoinThree]);
  const combinedDate = Array.from(
    new Set([
      ...coinOnePriceDates,
      ...coinTwoPriceDates,
      ...coinThreePriceDates,
    ])
  ).sort((a, b) => a - b);

  const data = {
    labels: combinedDate.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Coin One",
        data: currentCoinOne ? coinOnePrice : [],
        borderColor: "#7878FA",
        backgroundColor: gradientBackground as any,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-1",
        order: 1,
      },
      {
        fill: true,
        label: "Coin Two",
        data: currentCoinTwo ? coinTwoPrice : [],
        borderColor: "#D878FA",
        backgroundColor: gradientBackgroundTwo as any,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        yAxisID: "y-axis-2",
        order: 2,
      },
      {
        fill: true,
        label: "Coin Three",
        data: currentCoinThree ? coinThreePrice : [],
        borderColor: "#AFF83A",
        backgroundColor: gradientBackgroundThree as any,
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
                {currentPriceOne ? currentPriceOne.toLocaleString() : "loading"}{" "}
                mln
              </p>
            </div>
            <div className="flex">
              <p>
                {currentCoinTwo} ({currentCoinTwoSymbol})
              </p>
              <p>
                {currentPriceTwo ? currentPriceTwo.toLocaleString() : "loading"}{" "}
                mln
              </p>
            </div>
            {currentCoinThree && (
              <div className="flex">
                <p>
                  {currentCoinThree} ({currentCoinThreeSymbol})
                </p>
                <p>
                  {currentPriceThree
                    ? currentPriceThree.toLocaleString()
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
              {currentPriceOne
                ? Number(currentPriceOne).toLocaleString("en-US")
                : "Loading..."}
            </p>
            <p className="text-[#424286]">
              {currentPriceOne
                ? new Date(getCurrentDate).toDateString()
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
