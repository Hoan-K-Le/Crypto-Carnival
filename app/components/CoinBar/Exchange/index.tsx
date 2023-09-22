import React from "react";
import Icon from "../../Icon/Icon";

type ExchangeProp = {
  getData: { data: { markets: number } };
};

const Exchange = ({ getData }: ExchangeProp) => {
  return (
    <div className="flex gap-2 items-center">
      <span>
        <Icon iconVariant="swap" />
      </span>
      <span>Exchange</span>
      <span className="font-semibold">{getData.data.markets}</span>
    </div>
  );
};

export default Exchange;
