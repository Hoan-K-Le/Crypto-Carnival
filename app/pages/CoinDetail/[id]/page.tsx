"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { fetchCoinDetails } from "@/app/store/CoinDetailData";
import ViewCoinDetailsPage from "@/app/components/CoinDetails/ViewCoinDetails";
import { CoinProp } from "@/app/types/single_coin_type";

type Params = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params }: Params) => {
  const [coinDetail, setCoinDetail] = useState<CoinProp>();
  const { id } = params;
  const dispatch = useDispatch<AppDispatch>();

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
  }, [dispatch, id]);

  return (
    <div className=" py-20 px-52">
      <ViewCoinDetailsPage coinDetail={coinDetail} />
    </div>
  );
};

export default CoinPage;
