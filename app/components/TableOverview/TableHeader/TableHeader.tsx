import React from "react";

const TableHeader = () => {
  const header = [
    "#",
    "Name",
    "Price",
    "1h%",
    "24%",
    "7d%",
    "24H Volume/Market Cap",
    "Circulating/Total Supply",
    "Last 7d",
  ];
  return (
    <thead className=" dark:bg-slate700 sticky h-[3rem]">
      <tr className="text-left">
        {header.map(el => (
          <th key={el}>{el}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
