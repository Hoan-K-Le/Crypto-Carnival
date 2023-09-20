import React from "react";

const TableHeader = () => {
  return (
    <thead className=" bg-white dark:bg-slate700 sticky h-[3rem]">
      <tr className="text-left">
        <th>#</th>
        <th className="pl-10">Name</th>
        <th className="">Price</th>
        <th className="">1h%</th>
        <th className="">24h%</th>
        <th className="">7d%</th>
        <th className="">24h Volume/Market Cap</th>
        <th className="">Circulating/Total Supply</th>
        <th className="">Last 7d *</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
