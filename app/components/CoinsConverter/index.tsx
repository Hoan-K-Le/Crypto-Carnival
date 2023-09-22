"use client";
import React, { useState } from "react";
import PageLink from "../links/PageLink";

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
    <div className="flex m-10">
      <div className="bg-white flex">
        <button
          onClick={handleCoinsClick}
          className={`${
            isCoinsActive
              ? "bg-[#6161D6] bg-opacity-50 text-white"
              : "text-[#424286]"
          } px-20 py-4 rounded-lg text-lg`}
        >
          <PageLink href="/" text="Coins" />
        </button>
        <button
          onClick={handleConverterClick}
          className={`${
            isConverterActive
              ? "bg-[#6161D6] bg-opacity-50 text-white"
              : "text-[#424286]"
          } py-4 px-20 rounded-lg text-lg`}
        >
          <PageLink href="../pages/Converter" text="Converter" />
        </button>
      </div>
    </div>
  );
};

export default CoinsConverter;
