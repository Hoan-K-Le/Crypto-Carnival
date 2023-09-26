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
    y: {
      display: false,
    },
  },
};

export default function LineChart() {
  const [bitcoinPrices, setBitcoinPrices] = useState<number[]>([]);
  const [bitcoinPriceDates, setBitcoinPriceDates] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState([]);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const [
    gradientBackground,
    setGradientBackground,
  ] = useState<CanvasGradient | null>(null);
  const isLoading = useAppSelector(state => state.coinGraph.isLoading);
  const currentCoinOne = useAppSelector(state => state.coinOne.coinOne);
  const currentCoinOneSymbol = useAppSelector(state => state.coinOne.symbol);
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef();
  const fetchChartData = async () => {
    try {
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: currentCoinOne,
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
        setBitcoinPrices(prices);
        setBitcoinPriceDates(date);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(116, 116, 242, 0.6)");
      gradient.addColorStop(1, "rgba(116, 116, 242, 0.01)");
      setGradientBackground(gradient);
    }
  }, [currentCurrency, currentCoinOne]);

  const data = {
    labels: bitcoinPriceDates.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Prices",
        data: bitcoinPrices,
        borderColor: "#7878FA",
        backgroundColor: gradientBackground as any,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full h-[400px]">
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
