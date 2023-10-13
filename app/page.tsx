"use client";
import TableOverview from "./components/TableOverview/TableOverview";
import CoinCarousel from "./components/CoinCarousel";
import ChartContainer from "./components/Charts/ChartContainer";
import CoinsConverter from "./components/CoinsConverter";

export default function Home() {
  return (
    <>
      <CoinsConverter />
      <main className=" px-24 pt-10">
        <CoinCarousel />
        <div className="flex my-16">
          <ChartContainer />
        </div>

        {/* Table Here */}
        <TableOverview />
      </main>
    </>
  );
}
