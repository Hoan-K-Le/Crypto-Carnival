import React from "react";
import { CoinAssetProps } from "@/app/types/coin_asset";

type ModalAmountProps = {
  setCoinAsset: React.Dispatch<React.SetStateAction<CoinAssetProps>>;
  amount: string;
};

function ModalAmount({ setCoinAsset, amount }: ModalAmountProps) {
  return (
    <div className="py-2 px-4 w-full border rounded-xl">
      <input
        type="text"
        placeholder="Purchase Amount"
        className="w-full focus:outline-none"
        value={amount}
        onChange={e =>
          setCoinAsset(prevState => ({
            ...prevState,
            amount: e.target.value,
          }))
        }
      />
    </div>
  );
}

export default ModalAmount;
