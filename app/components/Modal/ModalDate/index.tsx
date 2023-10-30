import DatePicker from "react-datepicker";
import { CoinAssetProps } from "@/app/types/coin_asset";

type ModalDateProps = {
  setCoinAsset: React.Dispatch<React.SetStateAction<CoinAssetProps>>;
  purchasedDate: Date | null;
};

function ModalDatePicker({ setCoinAsset, purchasedDate }: ModalDateProps) {
  return (
    <div className="w-full py-2 px-4 border rounded-xl">
      <DatePicker
        selected={purchasedDate}
        onChange={date =>
          setCoinAsset(prevState => ({
            ...prevState,
            purchasedDate: date,
          }))
        }
      />
    </div>
  );
}

export default ModalDatePicker;
