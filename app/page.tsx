"use client";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import TableOverview from "./components/TableOverview/TableOverview";
import CoinCarousel from "./components/CoinCarousel";

export default function Home() {
  return (
    <main className=" px-24 pt-10">
      <CoinCarousel />
      <div className="flex my-16">
        <LineChart />
        <BarChart />
      </div>

      {/* Table Here */}
      <TableOverview />
    </main>
  );
}
