import React from "react";

function ProgressBar({
  changeBgColor,
  data,
}: {
  changeBgColor: string;
  data: number;
}) {
  return (
    <div className={`w-full h-[10px] rounded-xl  ${changeBgColor}`}>
      <div
        className={`h-[10px] rounded-xl ${changeBgColor} `}
        style={{
          width: `${data || 0}%`,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
