import React from "react";
import Icon from "../../Icon/Icon";
import { GlobalDataType } from "@/app/store/CoinsBarData";

type CoinProps = {
  getData: { data: { active_cryptocurrencies: number } };
};

function Coins({ getData }: CoinProps) {
  return (
    <div className="flex gap-2 items-center">
      <span className="bg-white rounded-full  text-[#1e1932]">
        <Icon iconVariant="lightning" />
      </span>
      <span>Coins</span>
      <span className="font-semibold">
        {getData.data.active_cryptocurrencies}
      </span>
    </div>
  );
}

export default Coins;
