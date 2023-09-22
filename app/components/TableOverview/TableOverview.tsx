"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import TableHeader from "./TableHeader/TableHeader";
import CoinName from "./CoinName";
import CoinAvg from "./CoinAvg";
import ProgressBar from "../ProgressBar/ProgressBar";
import CirculatingSupply from "./CirculatingSupply";
import VolumeMarket from "./VolumeMarket";
import CoinRank from "./CoinRank";
import CoinPrice from "./CoinPrice";
import { TableDataProps } from "./TableDataProps";
import { fetchCoins } from "@/app/store/CoinsData";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
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
import { current } from "@reduxjs/toolkit";
ChartJS.register(
  Title,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function TableOverview() {
  const [coins, setCoins] = useState<TableDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const coinsData = useAppSelector(state => state.coins.coins);

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
          fill: false,
          borderColor: avgData < 0 ? "red" : "green",
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
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
    return data < 0 ? "text-red-600" : "text-green-600";
  };

  const progressBar = (dataOne: number, dataTwo: number): string => {
    const result = (dataOne / dataTwo) * 100;
    return result.toString();
  };

  const formatNumber = (number: number): string => {
    if (number < 0) {
      return `-${formatNumber(-number)}`;
    }
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }

    return number.toString();
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
    <>
      {/* Table Overview */}
      <h2 className="">Your Overview</h2>
      {/* Container wrapper */}
      <div className="dark:bg-slate900 bg-white p-4 mt-4 rounded-xl relative h-[600px] scrollbar-thin scrollbar-slate700 overflow-y-auto ">
        {/* Table */}
        {/* <InfiniteScroll
          dataLength={coins.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        > */}
        <table className="w-full relative">
          <TableHeader />
          <tbody className="">
            {coinsData &&
              coinsData.map((coin: TableDataProps) => (
                <tr
                  key={`${Math.random() + coin.id}`}
                  className="border-b-[1px] w-full"
                >
                  <CoinRank coin={coin} />
                  <CoinName coin={coin} />
                  <CoinPrice coin={coin} getSymbol={getSymbol} />
                  <CoinAvg coin={coin} getAverageData={getAverageData} />

                  <td className="py-4 w-1/6">
                    <div className="flex flex-col w-4/5">
                      <VolumeMarket
                        symbol={symbol}
                        coin={coin}
                        formatNumber={formatNumber}
                      />
                      <ProgressBar coin={coin} progressBar={progressBar} />
                    </div>
                  </td>

                  <td className="py-4 w-1/6">
                    <div className="w-4/5 flex flex-col">
                      <CirculatingSupply
                        symbol={symbol}
                        coin={coin}
                        formatNumber={formatNumber}
                      />
                      <ProgressBar coin={coin} progressBar={progressBar} />
                    </div>
                  </td>
                  <td className="">
                    <div className="w-[150px] h-[100px] flex items-end">
                      <Line
                        data={makeChart(
                          coin,
                          coin.sparkline_in_7d?.price,
                          coin.price_change_percentage_7d_in_currency
                        )}
                        options={options}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* </InfiniteScroll> */}
      </div>
    </>
  );
}
