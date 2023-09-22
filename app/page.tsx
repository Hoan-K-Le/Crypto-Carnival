"use client";
import ChartContainer from "./components/Charts/ChartContainer";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import TableOverview from "./components/TableOverview/TableOverview";

export default function Home() {
  return (
    <main className=" dark:bg-[#13121A]  px-24 pt-10">
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
