import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const convertToTimeFrame = (day: string) => {
  if (Number(day) <= 14) {
    return day.toString() + "D";
  } else if (day === "max") {
    return day;
  } else {
    day = "1";
    return day + "M";
  }
};

function ChartContainer() {
  const [days, setDays] = useState<string[]>(["1", "7", "14", "30", "max"]);
  const [selectedDays, setSelectedDays] = useState<string>("7");
  const handleSelectDay = (day: string) => {
    setSelectedDays(day);
  };
  useEffect(() => {
    console.log("selectedDay:", selectedDays);
  }, [selectedDays]);
  return (
    <div className=" flex flex-col w-full ">
      <div className="flex">
        <LineChart selectedDay={selectedDays} />
        <BarChart selectedDay={selectedDays} />
      </div>
      <div className="w-[463px] mt-10">
        <ul className="flex justify-between rounded-xl p-1 bg-[#CCCCFA] bg-opacity-50">
          {days.map(day => (
            <li
              key={day}
              className={`${
                selectedDays === day
                  ? "bg-[#6161D6] bg-opacity-50 text-[#181825]  translate-x-1"
                  : "text-[#424286] bg-trasparent"
              } rounded-lg px-5 py-3 transition-transform duration-700 transform`}
              value={day}
            >
              <button
                className="uppercase"
                onClick={() => handleSelectDay(day)}
              >
                {convertToTimeFrame(day)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChartContainer;
