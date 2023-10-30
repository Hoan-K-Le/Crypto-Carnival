"use client";
import { useState, useEffect, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import ProgressBar from "@/app/utilities/progressBar";
import Modal from "@/app/components/Modal";
import getSymbol from "@/app/utilities/symbol";
import { AssetProps } from "@/app/types/asset";
import { useAppSelector } from "@/app/store/store";
import { fetchCoinById } from "@/app/utilities/fetchCoinsById";
import {
  PortfolioHeader,
  PortfolioCoinInfo,
  PortfolioCoinData,
} from "@/app/components/PortfolioOverview/portfolio_imports";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#FBBAD1",
};

function Portfolio() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [asset, setAsset] = useState<AssetProps[] | null>(() => {
    const storedAssets = localStorage.getItem("portfolioAssets");
    return storedAssets ? JSON.parse(storedAssets) : null;
  });
  const [coinsAsset, setCoinsAsset] = useState<AssetProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentCurrency = useAppSelector(state => state.currency.currencies);

  const handleDisplayModal = () => {
    setOpenModal(true);
  };

  const updateAssetsWithPromise = async () => {
    if (!asset) return;
    setIsLoading(true);
    try {
      const coinPromises = asset
        ? asset?.map((a: AssetProps) => fetchCoinById(a.name))
        : [];
      const coins = await Promise.all(coinPromises);
      const updatedAsset = asset?.map((a: AssetProps) => {
        const findCoin = coins?.reduce((acc, coin) => {
          acc[coin.id] = coin;
          return acc;
        }, {});
        const updateCoinData = findCoin[a.name];
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
          <PortfolioHeader handleDisplayModal={handleDisplayModal} />
          {coinsAsset?.map(
            (
              {
                name,
                total_price,
                purchaseDate,
                updateCoinData: {
                  image = {},
                  symbol = "",
                  market_data: {
                    current_price = {},
                    price_change_percentage_24h = null,
                  } = {},
                } = {},
              },
              idx
            ) => (
              <div key={name + idx} className="flex flex-col gap-4 mt-10">
                <div className="w-full p-6 rounded-xl flex bg-white shadow">
                  <PortfolioCoinInfo
                    name={name}
                    symbol={symbol}
                    image={image.thumb}
                    current_price={current_price?.usd}
                    total_price={total_price}
                    purchaseDate={purchaseDate}
                  />
                  <div className="w-7/12 flex gap-2">
                    <PortfolioCoinData
                      symbol={getSymbol(currentCurrency)}
                      data={current_price[currentCurrency].toFixed(2)}
                      title="Current Price"
                      dataPercentage="44%" // placeholder for now
                      ProgressBar={
                        <ProgressBar data={20} changeBgColor={"bg-[#01F1E3]"} />
                      }
                      titleTwo="Market cap vs volume"
                    />
                    <PortfolioCoinData
                      data={`${price_change_percentage_24h?.toFixed(2)}%`}
                      symbol=""
                      title="24h%"
                      dataPercentage="44%" //placeholder for now
                      titleTwo="Circ supply vs max supply"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
export default Portfolio;
