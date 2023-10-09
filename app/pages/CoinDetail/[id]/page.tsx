"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { fetchCoinDetails } from "@/app/store/CoinDetailData";
import CoinInfo from "@/app/components/CoinDetails/CoinInfo";
import CoinDescription from "@/app/components/CoinDetails/CoinDescription";
import CoinDetailData from "@/app/components/CoinDetails/CoinData";

type Params = {
  params: {
    id: string;
  };
};

type CoinDetailProps = {
  name: string;
  image: { thumb: string };
  description: { en: string };
  symbol: string;
  links: { blockchain_site: string; homepage: string };
  market_data: {
    price_change_percentage_7d: number;
    price_change_percentage_24h: number;
    current_price: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    total_volume: { btc: number; usd: number };
    market_cap: { usd: number };
    fully_diluted_valuation: { usd: number };
    total_supply: number;
    circulating_supply: number;
  };
};

const CoinPage = ({ params }: Params) => {
  const [coinDetail, setCoinDetail] = useState<CoinDetailProps>();
  const { id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await dispatch(fetchCoinDetails(id));
        if (fetchCoinDetails.fulfilled.match(data)) {
          setCoinDetail(data.payload);
        }
      } catch (err) {
        console.log(`Error on condetail page ${err}`);
      }
    };
    fetchDetails();
    console.log(coinDetail);
  }, [dispatch, id]);

  return (
    <div className=" py-20 px-52">
      <div className="flex gap-10 border-b-2 pb-10">
        {coinDetail && (
          <>
            <CoinInfo coinDetail={coinDetail} />
            <CoinDescription coinDetail={coinDetail} />
          </>
        )}
      </div>
      {coinDetail && <CoinDetailData coinDetail={coinDetail} />}
    </div>
  );
};

export default CoinPage;
