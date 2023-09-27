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
  const [coinOnePriceDates, setCoinOnePriceDates] = useState<number[]>([]);
  const [coinTwoPrice, setCoinTwoPrice] = useState<number[]>([]);
  const [coinTwoPriceDates, setCoinTwoPriceDates] = useState<number[]>([]);
  const [coinThreePrice, setCoinThreePrice] = useState<number[]>([]);
  const [coinThreePriceDates, setCoinThreePriceDates] = useState<number[]>([]);

  const [currentPrice, setCurrentPrice] = useState([]);
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
  const isLoading = useAppSelector(state => state.coinGraph.isLoading);
  const currentCoinOne = useAppSelector(state => state.coinOne.coinOne);
  const currentCoinOneSymbol = useAppSelector(state => state.coinOne.symbol);
  const currentCoinTwo = useAppSelector(state => state.coinTwo.coinTwo);
  const currentCoinTwoSymbol = useAppSelector(state => state.coinTwo.symbol);
  const currentCoinThree = useAppSelector(state => state.coinThree.coinThree);
  const currentCoinThreeSymbol = useAppSelector(
    state => state.coinThree.symbol
  );
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef();
  const fetchChartData = async (
    coin: any,
    setPrice: any,
    setPriceDates: any
  ) => {
    try {
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: coin,
        })
      );

      if (fetchGraphData.fulfilled.match(chartData)) {
        const currentDate = new Date();
        const getCurrentData = chartData.payload.prices.filter(
          (price: [number, number]) => {
            const priceDate = new Date(price[0]);
            return currentDate.toDateString() === priceDate.toDateString();
          }
        );
        setCurrentPrice(getCurrentData);

        const prices = chartData.payload.prices.map(
          (price: [number, number]) => price[1]
        );
        const date = chartData.payload.prices.map(
          (price: [number, number]) => price[0]
        );
        setPrice(prices);
        setPriceDates(date);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchDataForSelectedCoins = () => {
      if (currentCoinOne) {
        fetchChartData(currentCoinOne, setCoinOnePrice, setCoinOnePriceDates);
      }
      if (currentCoinTwo) {
        fetchChartData(currentCoinTwo, setCoinTwoPrice, setCoinTwoPriceDates);
      }
      if (currentCoinThree) {
        fetchChartData(
          currentCoinThree,
          setCoinThreePrice,
          setCoinThreePriceDates
        );
      }
    };

    fetchDataForSelectedCoins();
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
      <div className="flex flex-col gap-2">
        <p className="text-xl uppercase text-[#191932]">
          {currentCoinOne} ({currentCoinOneSymbol})
        </p>
        <p className="text-3xl text-[#181825]">
          {currentPrice.length > 0
            ? Number(currentPrice[0][1]).toLocaleString("en-US")
            : "Loading..."}
        </p>
        <p className="text-[#424286]">
          {currentPrice.length > 0
            ? new Date(currentPrice[0][0]).toDateString()
            : "Loading..."}
        </p>
      </div>

      {isLoading ? (
        <div>Linegraph Loading...</div>
      ) : (
        <Line ref={chartRef} data={data} options={options} />
      )}
    </div>
  );
}
