"use client";
import { useState, useEffect, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch } from "react-redux";
import ProgressBar from "@/app/utilities/progressBar";
import Modal from "@/app/components/Modal";
import { AssetProps } from "@/app/types/asset";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { fetchCoinDetails } from "@/app/store/CoinDetailData";
import { getIcon } from "@/app/utilities/getIcons";
import getSymbol from "@/app/utilities/symbol";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#FBBAD1",
};

const profitPercentage = (currentPrice: number, boughtPrice: number) => {
  const grabProfit = currentPrice - boughtPrice;
  return (grabProfit / boughtPrice) * 100;
};

export default function Portfolio() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [asset, setAsset] = useState<AssetProps[] | null>(() => {
    const storedAssets = localStorage.getItem("portfolioAssets");
    return storedAssets ? JSON.parse(storedAssets) : null;
  });
  const [coinsAsset, setCoinsAsset] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const dispatch = useDispatch<AppDispatch>();

  const handleDisplayModal = () => {
    setOpenModal(true);
  };

  const fetchCoinById = async (id: string) => {
    try {
      const data = await dispatch(fetchCoinDetails(id));
      if (fetchCoinDetails.fulfilled.match(data)) {
        return data;
      }
    } catch (err) {
      console.error(`${err} on fetchCoinById`);
    }
    return null;
  };

  const updateAssetsWithPromise = async () => {
    try {
      if (!asset) return;
      setIsLoading(true);
      const coinPromises = asset
        ? asset?.map((a: AssetProps) => fetchCoinById(a.name))
        : [];
      const coins = await Promise.all(coinPromises);
      const updatedAsset = asset?.map((a: AssetProps) => {
        const updateCoinData = coins?.find((c: any) => c.payload.id === a.name);
        console.log(updateCoinData, "updateCoinData");
        if (!updateCoinData) {
          console.warn("No matching data");
          return a;
        }
        return {
          ...a,
          updateCoinData,
        };
      });
      setCoinsAsset(updatedAsset);
      setIsLoading(false);
    } catch (err) {
      console.error(`${err}:error updateAssetsWithPromise`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (asset) {
      localStorage.setItem("portfolioAssets", JSON.stringify(asset));
    }
    updateAssetsWithPromise();
  }, [asset]);

  return (
    <div className="py-10 px-52 relative">
      {isLoading ? (
        <MoonLoader
          color="#00B1A7"
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <Modal
            openModal={openModal}
            setAsset={setAsset}
            setOpenModal={setOpenModal}
          />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Portfolio</h1>
            <button
              onClick={handleDisplayModal}
              className="px-20 rounded-xl py-4 bg-white"
            >
              Add Asset
            </button>
          </div>
          {coinsAsset?.map((c: any) => (
            <div key={c.name} className="flex flex-col gap-4 mt-10">
              {/* container */}
              <div className="w-full p-6 rounded-xl flex bg-white shadow">
                {/* beg left side */}
                <div className="w-5/12 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={c.updateCoinData?.payload?.image?.thumb}
                      alt="placeholder"
                      className="h-[40px] w-[40px]"
                    />
                    <span className="text-2xl uppercase">
                      {c?.name}
                      {c?.updateCoinData?.payload?.symbol}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[#888]">Total Value</p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">
                        ${c?.total_price.toFixed(2)}
                      </span>
                      <span className="text-lg flex items-center gap-2">
                        {getIcon(
                          profitPercentage(
                            c?.updateCoinData?.payload?.market_data
                              ?.current_price?.usd,
                            c?.total_price
                          )
                        )}
                        {profitPercentage(
                          c?.updateCoinData?.payload?.market_data?.current_price
                            .usd,
                          c?.total_price
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                    <p className="text-sm text-[#888]">
                      Purchased {c?.purchaseDate}
                    </p>
                  </div>
                </div>
                {/* end of left side */}
                {/* beg of right side */}
                <div className="w-7/12 flex gap-2">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="border p-2">
                      <p className="text-xl">
                        {getSymbol(currentCurrency)}
                        {c?.updateCoinData?.payload?.market_data?.current_price[
                          currentCurrency
                        ].toFixed(2)}
                      </p>
                      <p className="text-[#888] text-sm">Current Price</p>
                    </div>
                    <div className="border  p-2">
                      <div className="flex items-center gap-2 ">
                        <p className="text-xl">44%</p>
                        <ProgressBar data={20} changeBgColor={"bg-[#01F1E3]"} />
                      </div>
                      <p className="text-[#888] text-sm">
                        Market cap vs volume
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col gap-4">
                      <div className="border p-2">
                        <p className="text-xl">
                          {c?.updateCoinData?.payload?.market_data.price_change_percentage_24h?.toFixed(
                            2
                          )}
                          %
                        </p>
                        <p className="text-[#888] text-sm">24h%</p>
                      </div>
                      <div className="border p-2">
                        <div className="flex items-center gap-2 ">
                          <p className="text-xl">44%</p>
                        </div>
                        <p className="text-[#888] text-sm">
                          Circ supply vs max supply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of right side */}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
