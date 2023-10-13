import React from "react";
import { convertToTimeFrame } from "@/app/utilities/convertToTimeFrame";

type DisplayDaysProps = {
  days: (string | number)[];
  selectedDays: string;
  handleSelectDay: (day: string) => void;
};

function DisplayDaysInterval({
  days,
  selectedDays,
  handleSelectDay,
}: DisplayDaysProps) {
  return (
    <div className=" mt-8 w-[463px]">
      <ul className="flex gap-4 justify-between px-4 py-2 rounded-xl bg-[#CCCCFA] bg-opacity-50">
        {days?.map((day: string | number) => (
          <li
            key={day}
            className={`${
              selectedDays === day
                ? "bg-[#6161D6] bg-opacity-50 text-[#181825]"
                : "text-[#424286] bg-trasparent"
            }cursor-pointer rounded-lg px-4 py-2`}
            value={day}
          >
            <button
              className="uppercase"
              onClick={() => handleSelectDay(day.toString())}
            >
              {convertToTimeFrame(day.toString())}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayDaysInterval;
