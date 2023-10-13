import React from "react";

function CircularDot({
  changeDotColor,
  data,
}: {
  changeDotColor: string;
  data: number;
}) {
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
