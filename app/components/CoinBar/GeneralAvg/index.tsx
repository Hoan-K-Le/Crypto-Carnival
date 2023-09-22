import React from "react";
type GeneralAvgProps = {
  getData: {
    data: {
      market_cap_percentage: { btc: number; eth: number };
    };
  };
};

const GeneralAvg = ({ getData }: GeneralAvgProps) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <img
          className="h-[25px] w-[25px]"
          src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026"
          alt="btc-logo"
        />
        <span className="font-semibold">
          {getData.data.market_cap_percentage.btc?.toFixed(0)}%
        </span>
        <span className="h-[10px] relative border rounded-xl flex items-center content-left bg-[#FFFFFF] w-[5rem]">
          <span
            className="absolute -left-1 h-[10px] bg-[#F7931A] rounded-xl"
            style={{
              width: `${getData.data.market_cap_percentage.btc?.toFixed(0)}%`,
            }}
          ></span>
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="bg-[#627EEA] rounded-full h-[25px] w-[25px]"
          src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=026"
          alt="eth-logo"
        />
        <span className="font-semisemibold">
          {getData.data.market_cap_percentage.eth?.toFixed(0)}%
        </span>
        <span className="h-[10px] relative border  rounded-xl flex items-center bg-[#FFFFFF] w-[5rem]">
          <span
            className="absolute -left-1 h-[10px] bg-[#849DFF] rounded-xl"
            style={{
              width: `${getData.data.market_cap_percentage.eth?.toFixed(0)}%`,
            }}
          ></span>
        </span>
      </div>
    </>
  );
};

export default GeneralAvg;
