import React from "react";
import Icon from "../../Icon/Icon";
type GeneralMarketCapProps = {
  getData: { data: { total_market_cap: { usd: number } } };
  formatNumber: (number: number) => string;
};

const GeneralMarketCap = ({ formatNumber, getData }: GeneralMarketCapProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span>
        <Icon className="text-[#01F1E3]" iconVariant="arrowUp" />
      </span>
      <span className="font-semibold">
        {formatNumber(getData.data.total_market_cap.usd)}
      </span>
    </div>
  );
};

export default GeneralMarketCap;
