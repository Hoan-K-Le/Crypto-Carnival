import React from "react";
import getSymbol from "@/app/utilities/symbol";
import { useAppSelector } from "@/app/store/store";
import { changeBgColor } from "@/app/utilities/changeBgColor";
import { calculateAvg } from "@/app/utilities/calculateAvg";
import { MarketDataProps } from "@/app/types/market_data";
import { CoinDetailProps } from "@/app/types/coin_detail";
import ProgressBar from "@/app/utilities/progressBar";
import CoinDataDetails from "./CoinDataDetails";
import CircularDot from "./CircularDot";

type CoinDetailData = {
  coinDetail: CoinDetailProps & {
    market_data: MarketDataProps;
  };
};

function CoinDetailData({ coinDetail }: CoinDetailData) {
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const {
    symbol = "",
    market_data: {
      total_volume = { btc: 0, [currentCurrency]: 0 },
      market_cap = { [currentCurrency]: 0 },
      total_supply = 0,
      circulating_supply = 0,
      price_change_percentage_24h = 0,
      fully_diluted_valuation = { [currentCurrency]: 0 },
    } = {},
  } = coinDetail || {};

  return (
    <>
      <div className="flex gap-5 mt-7 ">
        <div className="flex gap-2 w-full">
          <div className="bg-white shadow px-6 py-10  flex flex-col gap-4 w-full rounded-xl">
            <CoinDataDetails
              title="Total Volume"
              data={total_volume.btc}
              symbol={symbol}
            />
            <CoinDataDetails
              title="Volume 24H"
              frontSymbol={true}
              symbol={getSymbol(currentCurrency)}
              data={total_volume[currentCurrency]}
            />
            <CoinDataDetails
              title="Volume/Market"
              data={calculateAvg(
                total_volume[currentCurrency],
                market_cap[currentCurrency]
              ).toFixed(2)}
              symbol=""
            />
          </div>
        </div>
        <div className="bg-white shadow rounded-xl w-full flex flex-col gap-4 px-6 py-10">
          <CoinDataDetails
            title="Market Supply"
            data={total_supply.toLocaleString("en-US")}
            symbol={symbol}
          />
          <CoinDataDetails
            title="Circulating Supply"
            data={circulating_supply.toLocaleString("en-US")}
            symbol={symbol}
          />

          <div className="flex justify-between">
            <CircularDot
              data={calculateAvg(total_volume.usd, market_cap.usd)}
              changeDotColor={changeBgColor(
                price_change_percentage_24h,
                "FE2264",
                "00B1A7"
              )}
            />
            <CircularDot
              data={Math.abs(
                calculateAvg(total_volume.usd, market_cap.usd) - 100
              )}
              changeDotColor={changeBgColor(
                price_change_percentage_24h,
                "FBBAD1",
                "AFE5E5"
              )}
            />
          </div>
          <ProgressBar
            data={calculateAvg(
              total_volume[currentCurrency],
              market_cap[currentCurrency]
            )}
            changeBgColor={changeBgColor(
              price_change_percentage_24h,
              "FBBAD1",
              "AFE5E5"
            )}
          />
        </div>
      </div>
      <div className="bg-white shadow px-6 py-10 flex flex-col gap-4 rounded-xl mt-4 w-[48.5%]  mr-4">
        <CoinDataDetails
          title="Market Cap"
          data={market_cap.usd.toLocaleString("en-US")}
          symbol={getSymbol(currentCurrency)}
          frontSymbol={true}
        />
        <CoinDataDetails
          title="Fully Diluted Valuation"
          data={fully_diluted_valuation.usd.toLocaleString("en-US")}
          symbol={getSymbol(currentCurrency)}
          frontSymbol={true}
        />
      </div>
    </>
  );
}

export default CoinDetailData;
