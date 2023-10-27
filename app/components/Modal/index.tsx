import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { fetchCoins } from "@/app/store/CoinsData";
import { AssetProps } from "@/app/types/asset";
import Icon from "../Icon/Icon";
import { fetchCoinAsset } from "@/app/store/CoinAsset";
import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
  setAsset: (value: any) => any;
}

type SelectedCoinProps = {
  name: string;
  coin_price: number;
};

function Modal({ openModal, setOpenModal, setAsset }: ModalProps) {
  const [dropDownCoin, setDropDownCoin] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(new Date());
  const [amount, setAmount] = useState<string>("1");
  const [coins, setCoins] = useState<any>();
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

  if (!purchaseDate) return null;
  const purchaseDateFormat = `${purchaseDate?.getDate()}-${purchaseDate?.getMonth() +
    1}-${purchaseDate?.getFullYear()}`;

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

  const handleViewCoins = () => {
    setDropDownCoin(prevState => !prevState);
  };

  const handleSelectCoin = (event: React.MouseEvent, coinName: string) => {
    event.stopPropagation();
    setSelectedCoin(coinName);
    setDropDownCoin(false);
  };

  const handleSaveAsset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenModal(false);
    fetchAsset(selectedCoin);
    setSelectedCoin("");
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
        <div className="flex justify-between items-center mb-5">
          <p className=" text-xl">Select Coins</p>
          <button className="text-xl mr-2" onClick={() => setOpenModal(false)}>
            x
          </button>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col items-center w-5/12 gap-2 py-20 px-16 bg-[#6161D6] bg-opacity-40 rounded-xl shadow">
            <img
              src="https://placeholder.com/200/300"
              alt="placeholder"
              className="h-[50px] w-[50px] block"
            />
            <div className="flex items-center gap-2 mt-4">
              <p className="uppercase text-3xl text-white">bitcoin</p>
              <p className="uppercase text-3xl text-white"> (btc)</p>
            </div>
          </div>
          <div className="flex flex-col justify-between w-7/12">
            <div className="flex flex-col gap-6">
              <div
                onClick={handleViewCoins}
                className="cursor-pointer select-none py-2 px-4 relative border rounded-xl flex justify-between w-full items-center"
              >
                <p className="w-full text-left">
                  {selectedCoin ? selectedCoin : "Select Coin"}
                </p>
                <Icon iconVariant="arrowDown" />
                <div
                  className={`absolute ${
                    dropDownCoin ? "flex" : "hidden"
                  }  bg-white bg-opacity-70 rounded-xl top-10 left-0 right-0 text-center flex-col justify-between overflow-y-auto h-[100px]`}
                >
                  {coins?.map((coin: any) => (
                    <button
                      onClick={e => handleSelectCoin(e, coin?.id)}
                      key={coin.id}
                      value={coin?.name}
                    >
                      {coin?.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="py-2 px-4 w-full border rounded-xl">
                <input
                  type="text"
                  placeholder="Purchase Amount"
                  className="w-full focus:outline-none"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div className="w-full py-2 px-4 border rounded-xl">
                <DatePicker
                  selected={purchaseDate}
                  onChange={date => setPurchaseDate(date)}
                />
              </div>
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
