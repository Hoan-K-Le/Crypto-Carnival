import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

type ChartData = {
  labels: (number | string)[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    yAxisID: string;
    pointRadius: number;
    tension: number;
  }[];
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
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
  },
};

function LineGraph({
  coinToSell,
  coinToBuy,
  selectedDays,
  chartData,
}: {
  coinToSell: any;
  coinToBuy: any;
  selectedDays: string;
  chartData: any;
}) {
  const data: ChartData = {
    labels:
      selectedDays === "1"
        ? chartData?.dates[0].map((date: string | number) =>
            new Date(date).toLocaleTimeString("en-US", {
              hour12: true,
            })
          )
        : chartData?.dates[0].map((date: string | number) =>
            new Date(date).getDate()
          ),
    datasets: [
      {
        label: "Coin 1 Prices",
        data: chartData?.prices[0],
        fill: false,
        borderColor: "#7878FA",
        yAxisID: "y-axis-1",
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Coin 2 Prices",
        data: chartData?.prices[1],
        fill: false,
        borderColor: "#D878FA",
        yAxisID: "y-axis-2",
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };
  return (
    <div className=" gap-3 mt-16 h-[293px] bg-white uppercase p-4 rounded-xl w-full">
      <div className="flex gap-4 text-xl w-full mb-10">
        <span>
          {coinToSell?.id}({coinToSell?.symbol})
        </span>
        <span className="text-[#353570] text-opacity-60">To</span>
        <span>
          {coinToBuy?.id}({coinToBuy?.symbol})
        </span>
      </div>
      <div className="h-[174px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineGraph;
