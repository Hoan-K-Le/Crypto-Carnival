"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { getBitcoinData } from "@/app/contexts/Charts";
import { useAppSelector } from "@/app/store/store";
ChartJS.register(CategoryScale, LinearScale, BarElement);

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

export default function BarChart() {
  const [bitcoinPriceVolumes, setBitcoinPriceVolumes] = useState<number[]>([]);
  const [bitcoinVolumeDates, setBitcoinVolumeDates] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const fetchChartData = async () => {
    try {
      const chartData = await getBitcoinData(currentCurrency);
      const Volumes = chartData.total_volumes.map(
        (volumes: [number, number]) => volumes[1]
      );
      const dates = chartData.total_volumes.map(
        (volumes: [number, number]) => volumes[0]
      );
      setBitcoinPriceVolumes(Volumes);
      setBitcoinVolumeDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const currentTheme = localStorage.getItem("theme");
  const backgroundColor = currentTheme === "dark" ? "#3D63EC" : "#00FC2A";

  const data = {
    labels: bitcoinVolumeDates.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Volumes",
        data: bitcoinPriceVolumes,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
