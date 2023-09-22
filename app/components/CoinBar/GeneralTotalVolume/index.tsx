import React from "react";

type GeneralTotalVolumeProps = {
  getData: {
    data: {
      total_volume: { usd: number };
      market_cap_change_percentage_24h_usd: number;
    };
  };
  formatNumber: (number: number) => string;
};

const GeneralTotalVolume = ({
  formatNumber,
  getData,
}: GeneralTotalVolumeProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-bold">
        {formatNumber(getData.data.total_volume.usd)}
      </span>
      <span className="h-[10px] relative border  rounded-xl flex items-center bg-[#FFFFFF] w-[5rem]">
        <span
          className="absolute -left-1 h-[10px] bg-[#7474F299] bg-rounded-xl"
          style={{
            width: `${getData.data.market_cap_change_percentage_24h_usd?.toFixed(
              0
            )}%`,
          }}
        ></span>
      </span>
    </div>
  );
};

export default GeneralTotalVolume;
