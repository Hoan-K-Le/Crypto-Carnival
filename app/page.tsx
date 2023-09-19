"use client";
import { useState } from "react";
import ChartContainer from "./components/Charts/ChartContainer";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
// import ChartsOverview from './components/ChartsOverview/Charts'
import TableOverview from "./components/TableOverview/TableOverview";

export default function Home() {
  return (
    <main className="bg-[#F3F5F9] dark:bg-[#13121A] max-w-8xl mx-auto px-24 pt-20">
      <header>
        <h2 className="text-xl mb-7">Your overview</h2>
      </header>

      <div className="flex gap-11 mb-16">
        <ChartContainer name="BTC" price="13.431 mln" date="Aug 25, 2023">
          <LineChart />
        </ChartContainer>

        <ChartContainer
          name="Volume 24hr"
          price="807.24 bln"
          date="Aug 25, 2023"
        >
          <BarChart />
        </ChartContainer>
      </div>

      {/* Table Here */}
      <TableOverview />
    </main>
  );
}
