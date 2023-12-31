"use client";
import React, { useState } from "react";
import PageLink from "../links/PageLink";
import Link from "next/link";

const CoinsConverter = () => {
  const [isCoinsActive, setCoinsActive] = useState(true);
  const [isConverterActive, setConverterActive] = useState(false);

  const handleCoinsClick = () => {
    setCoinsActive(true);
    setConverterActive(false);
  };

  const handleConverterClick = () => {
    setCoinsActive(false);
    setConverterActive(true);
  };

  return (
    <div className="flex my-12 px-24">
      <div className="bg-white rounded-xl dark:bg-[#191925] dark:text-[#ffffff] flex">
        <Link
          onClick={handleCoinsClick}
          className={`${
            isCoinsActive
              ? "bg-[#6161D6] bg-opacity-50 text-white"
              : "text-[#424286]"
          } px-20 py-4 rounded-lg text-lg`}
          href="/"
        >
          Coins
        </Link>
        <Link
          href="../pages/Converter"
          onClick={handleConverterClick}
          className={`${
            isConverterActive
              ? "bg-[#6161D6] bg-opacity-50 text-white"
              : "text-[#424286]"
          } py-4 px-20 rounded-lg text-lg`}
        >
          Converter
        </Link>
      </div>
    </div>
  );
};

export default CoinsConverter;
