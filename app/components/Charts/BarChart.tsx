"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { useAppSelector, AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchGraphData } from "@/app/store/ChartSelectorData";

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
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
};

export default function BarChart() {
  const [bitcoinPriceVolumes, setBitcoinPriceVolumes] = useState<number[]>([]);
  const [bitcoinVolumeDates, setBitcoinVolumeDates] = useState<number[]>([]);
  const [currentData, setCurrentData] = useState([]);
  const [
    gradientBackground,
    setGradientBackground,
  ] = useState<CanvasGradient | null>(null);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const isLoading = useAppSelector(state => state.coinGraph.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef();
  const fetchChartData = async () => {
    try {
      const btc = "bitcoin";
      const chartData = await dispatch(
        fetchGraphData({
          currency: currentCurrency,
          name: btc,
        })
      );

      if (fetchGraphData.fulfilled.match(chartData)) {
        const currentDate = new Date();
        const getCurrentData = chartData.payload.total_volumes.filter(
          (volumeData: [number, number]) => {
            const volumeDate = new Date(volumeData[0]);
            return currentDate.toDateString() === volumeDate.toDateString();
          }
        );
        setCurrentData(getCurrentData);
        const volume = chartData.payload.total_volumes.map(
          (volume: [number, number]) => volume[1]
        );
        const date = chartData.payload.total_volumes.map(
          (volumeDate: [number, number]) => volumeDate[0]
        );
        setBitcoinPriceVolumes(volume);
        setBitcoinVolumeDates(date);
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
      gradient.addColorStop(0, "rgba(157, 98, 217, 1)");
      gradient.addColorStop(1, "rgba(179, 116, 242, 0.01)");
      setGradientBackground(gradient);
    }
  }, [currentCurrency]);

  const data = {
    labels: bitcoinVolumeDates.map(date => new Date(date).getDate()),
    datasets: [
      {
        fill: true,
        label: "Volumes",
        data: bitcoinPriceVolumes,
        backgroundColor: gradientBackground as any,
      },
    ],
  };

  return (
    <div className="h-[400px] w-full">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-[#191932]">Volume 24h</p>
        <p className="text-3xl text-[#181825]">
          {currentData.length > 0
            ? Number(currentData[0][1] as number).toLocaleString("en-US")
            : "Loading..."}
        </p>
        <p className="text-[#424286]">
          {currentData.length > 0
            ? new Date(currentData[0][1] as number).toDateString()
            : "Loading..."}
        </p>
      </div>
      {isLoading ? (
        <div>Loading Graphs...</div>
      ) : (
        <Bar ref={chartRef} data={data} options={options} />
      )}
    </div>
  );
}
