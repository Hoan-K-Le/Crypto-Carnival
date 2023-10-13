"use client";
import { useState, useEffect, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import CoinInfo from "../CoinInfo";
import CoinDescription from "../CoinDescription";
import CoinDetailData from "../CoinData";
import { CoinProp } from "@/app/types/single_coin_type";

type ViewCoinDetailsPageProp = {
  coinDetail: CoinProp | null | undefined;
};

function ViewCoinDetailsPage({ coinDetail }: ViewCoinDetailsPageProp) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#FBBAD1",
  };

  useEffect(() => {
    if (!coinDetail || !coinDetail.market_data) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        if (!coinDetail || !coinDetail.market_data) {
          setError("Cannot fetch the data");
          setLoading(false);
        }
      }, 6000);
      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {error ? (
        <p className="text-4xl text-center">{error}</p>
      ) : !coinDetail || !coinDetail.market_data ? (
        <MoonLoader
          color="#00B1A7"
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <div className="flex gap-10 border-b-2 pb-10">
            <CoinInfo coinDetail={coinDetail} />
            <CoinDescription coinDetail={coinDetail} />
          </div>
          <CoinDetailData coinDetail={coinDetail} />
        </>
      )}
    </>
  );
}

export default ViewCoinDetailsPage;
