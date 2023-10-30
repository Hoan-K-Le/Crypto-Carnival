import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { fetchCoins } from "@/app/store/CoinsData";
import { AssetProps } from "@/app/types/asset";
import { CoinAssetProps } from "@/app/types/coin_asset";
import { fetchCoinAsset } from "@/app/store/CoinAsset";
import {
  CoinSelectionList,
  ModalNameDisplay,
  ModalDatePicker,
  ModalAmount,
  ModalHeader,
} from "./modal_imports";

type ModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAsset: (value: any) => any;
};

const initialAsset = {
  name: "",
  amount: "1",
  purchasedDate: new Date(),
  total_price: 0,
};

type CoinsProps = {
  name: string;
  id: string;
}[];

function Modal({ openModal, setOpenModal, setAsset }: ModalProps) {
  const [dropDownCoinSelection, setDropDownCoinSelection] = useState(false);
  const [coinAsset, setCoinAsset] = useState<CoinAssetProps>(initialAsset);
  const [coins, setCoins] = useState<CoinsProps>([]);
  const currentCurrency = useAppSelector(state => state.currency.currencies);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    try {
      const data = await dispatch(fetchCoins(currentCurrency));
      if (fetchCoins.fulfilled.match(data)) {
        setCoins(data.payload);
      }
    } catch (err) {
      console.log(`ERROR ON PROFILE SIDE: ${err}`);
    }
  };

  const formatDate = (date: Date) => {
    return `${date?.getDate()}-${date?.getMonth() + 1}-${date?.getFullYear()}`;
  };
  const { purchasedDate, name, amount } = coinAsset;
  if (!purchasedDate) return null;
  const purchaseDateFormat = formatDate(purchasedDate);
  const fetchAsset = async (coinName: string) => {
    try {
      const coinNameLowerCase = coinName.toLowerCase();
      const data = await dispatch(
        fetchCoinAsset({ name: coinNameLowerCase, date: purchaseDateFormat })
      );
      if (!data.payload || !data.payload.market_data) {
        console.log(
          "No data for that coin during that date or missing market_data"
        );
        return;
      }
      const grabAssetData = {
        name: data.payload.id,
        total_price:
          data.payload.market_data.current_price[currentCurrency] *
          Number(amount),
        purchaseDate: purchaseDateFormat,
      };
      setAsset((prevState: AssetProps[] | null) => [
        ...(prevState || []),
        grabAssetData,
      ]);
    } catch (err) {
      console.error(`Error:${err}`);
    }
  };

  const handleSelectCoin = (event: React.MouseEvent, coinName: string) => {
    event.stopPropagation();
    setCoinAsset(prevState => ({ ...prevState, name: coinName }));
    setDropDownCoinSelection(false);
  };

  const handleViewCoins = () => {
    setDropDownCoinSelection(prevState => !prevState);
  };

  const handleSaveAsset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenModal(false);
    fetchAsset(name);
    setCoinAsset(prevState => ({ ...prevState, name: "" }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`fixed rounded-xl top-1/2 left-1/2  -translate-x-2/4 -translate-y-2/4 ${
        openModal ? "" : "hidden"
      } backdrop-blur-sm h-screen w-screen flex items-center z-20 justify-center`}
    >
      <div className=" bg-white rounded shadow-md border p-8 z-20 w-5/12">
        <ModalHeader setOpenModal={setOpenModal} />
        <div className="flex gap-10">
          <ModalNameDisplay name={name} />
          <div className="flex flex-col justify-between w-7/12">
            <div className="flex flex-col gap-6">
              <CoinSelectionList
                name={name}
                handleSelectCoin={handleSelectCoin}
                coins={coins}
                handleViewCoins={handleViewCoins}
                dropDownCoinSelection={dropDownCoinSelection}
              />
              <ModalAmount setCoinAsset={setCoinAsset} amount={amount} />
              <ModalDatePicker
                setCoinAsset={setCoinAsset}
                purchasedDate={purchasedDate}
              />
            </div>
            <div className="flex items-center justify-between gap-2 ">
              <button
                onClick={() => setOpenModal(false)}
                className="w-full border rounded-xl p-1 shadow "
              >
                Cancel
              </button>
              <button
                onClick={e => handleSaveAsset(e)}
                className="w-full p-1 rounded-xl text-white shadow bg-[#6161D6] bg-opacity-50"
              >
                Save and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
