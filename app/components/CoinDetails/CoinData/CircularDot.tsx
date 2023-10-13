import React from "react";

interface CircularDotProps {
  changeDotColor: string;
  data: number;
}

function CircularDot({ changeDotColor, data }: CircularDotProps) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`
           ${changeDotColor}
          rounded-full h-[10px] w-[10px]`}
      ></div>
      <span className="flex items-center">{data.toFixed(2)}%</span>
    </div>
  );
}

export default CircularDot;
