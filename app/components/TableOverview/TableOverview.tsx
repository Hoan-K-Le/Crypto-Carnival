"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { formatNumber } from "@/app/utilities/formatNumber";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { updateCoinsData } from "@/app/store/CoinsData";
import { useAppSelector } from "@/app/store/store";
import {
  Chart as ChartJS,
  Title,
  LineElement,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);
import TableHeader from "./TableHeader/TableHeader";
import CoinName from "./CoinName";
import CoinAvg from "./CoinAvg";
import ProgressBar from "../ProgressBar/ProgressBar";
import CirculatingSupply from "./CirculatingSupply";
import VolumeMarket from "./VolumeMarket";
import CoinRank from "./CoinRank";
import CoinPrice from "./CoinPrice";
import { TableDataProps } from "./TableDataProps";

export default function TableOverview() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const coinsData = useAppSelector(state => state.coins.coins || []);
  const isLoading = useAppSelector(state => state.coins.isLoading);
  const makeChart = (
    coin: TableDataProps,
    chartData: number[] | undefined,
    avgData: number
  ): any => {
    if (
      !coin ||
      !chartData ||
      chartData.length === 0 ||
      !coin.sparkline_in_7d
    ) {
      return null;
    }

    const data = {
      labels: new Array(chartData?.length).fill(""),
      datasets: [
        {
          label: "",
          data: chartData,
          fill: true,
          borderColor: avgData < 0 ? "#FE2264" : "#00B1A7",
          pointRadius: 0,
          borderWidth: 2,
          lineTension: 0.4,
          pointBackgroundColor: "transparent",
          pointBorderColor: "#transparent",
          backgroundColor:
            avgData < 0
              ? "rgba(254, 34, 100, 0.16)"
              : "rgba(0, 177, 167, 0.16)",
          hoverPointRadius: 0,
        },
      ],
    };
    return data;
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },

    animation: {
      duration: 2000,
      responsive: true,
    },
    bezierCurve: false,
  };

  const getAverageData = (data: number): string => {
    return data < 0 ? "text-[#FE2264]" : "text-[#00B1A7]";
  };

  const progressBar = (dataOne: number, dataTwo: number): string => {
    const result = (dataOne / dataTwo) * 100;
    return result.toString();
  };

  const getSymbol = () => {
    return currentCurrency === "usd"
      ? "$"
      : currentCurrency === "eur"
      ? "€"
      : "£";
  };

  const symbol = getSymbol();

  return (
    <div className="mt-4 rounded-xl relative h-[600px] scrollbar-thin scrollbar-slate700 overflow-y-auto ">
      <table className="w-full relative border-collapse border-spacing-y-5">
        <TableHeader />
        <tbody>
          {coinsData?.map((coin: TableDataProps) => (
            <tr key={coin.id} className=" rounded-2xl">
              <CoinRank coin={coin} />
              <CoinName coin={coin} />
              <CoinPrice coin={coin} getSymbol={getSymbol} />
              <CoinAvg coin={coin} getAverageData={getAverageData} />
              <td>
                <div className="flex flex-col w-4/5">
                  <VolumeMarket
                    symbol={symbol}
                    coin={coin}
                    formatNumber={formatNumber}
                  />
                  <ProgressBar coin={coin} progressBar={progressBar} />
                </div>
              </td>
              <td className="w-1/6">
                <div className="w-4/5 flex flex-col">
                  <CirculatingSupply
                    symbol={symbol}
                    coin={coin}
                    formatNumber={formatNumber}
                  />
                  <ProgressBar coin={coin} progressBar={progressBar} />
                </div>
              </td>
              <td>
                <div className="w-[150px] h-[100px] flex items-end">
                  <Line
                    data={makeChart(
                      coin,
                      coin.sparkline_in_7d?.price,
                      coin?.price_change_percentage_7d_in_currency ?? 0
                    )}
                    options={options}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
