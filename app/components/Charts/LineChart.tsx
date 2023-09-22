"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { getBitcoinData } from "@/app/contexts/Charts";
import { useAppSelector } from "@/app/store/store";
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
        display: false, // Removes the background grid lines for X-axis
      },
    },
    y: {
      display: false, // Removes the numbers for the y-axis
    },
  },
};

export default function LineChart() {
  const [bitcoinPrices, setBitcoinPrices] = useState<number[]>([]);
  const [bitcoinPriceDates, setBitcoinPriceDates] = useState<number[]>([]);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const fetchChartData = async () => {
    try {
      const chartData = await getBitcoinData(currentCurrency);
      const prices = chartData.prices.map(
        (price: [number, number]) => price[1]
      );
      const dates = chartData.prices.map((price: [number, number]) => price[0]);
      setBitcoinPrices(prices);
      setBitcoinPriceDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const currentTheme = localStorage.getItem("theme");
  const borderColor = currentTheme === "dark" ? "#00FC2A" : "#3D63EC";
  const gradientColorsDark = ["#192021", "#23322E", "#37413F"];
  const gradientColorsLight = ["#F9FAFF", "#ECF0FD", "#D9E1FB"];
  const gradientColor =
    currentTheme === "dark" ? gradientColorsDark : gradientColorsLight;

  const data = {
    labels: bitcoinPriceDates.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Prices",
        data: bitcoinPrices,
        borderColor: borderColor,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        backgroundColor: gradientColor,
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
