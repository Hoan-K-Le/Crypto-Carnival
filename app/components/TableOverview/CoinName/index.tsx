"use client";
import React from "react";
import PageLink from "../../links/PageLink";
import { TableDataProps } from "../TableDataProps";

const CoinName = ({ coin }: { coin: TableDataProps }) => {
  return (
    <td>
      <button className="flex justify-center gap-2">
        <PageLink
          className={"flex items-center gap-2"}
          href={`../pages/CoinDetail/${coin?.id}`}
          id={coin?.id}
        >
          <img className="w-[25px] h-[25px]" src={coin.image} alt="coin-img" />
          <span>{coin?.name}</span>
          <span>({coin?.symbol.toUpperCase()})</span>
        </PageLink>
      </button>
    </td>
  );
};

export default CoinName;
