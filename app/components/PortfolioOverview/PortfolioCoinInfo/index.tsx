import { getIcon } from "@/app/utilities/getIcons";
import { profitPercentage } from "@/app/utilities/protfitPercentage";
import { grabProtfitLoss } from "@/app/utilities/grabProfitLoss";

type PortfolioCoinInfoProps = {
  name: string;
  image?: string;
  symbol: string;
  total_price: number;
  purchaseDate: string;
  current_price: number;
};

function PortfolioCoinInfo({
  name,
  image,
  symbol,
  current_price,
  total_price,
  purchaseDate,
}: PortfolioCoinInfoProps) {
  return (
    <div className="w-5/12 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {image && (
          <img src={image} alt="placeholder" className="h-[40px] w-[40px]" />
        )}
        <div className="text-2xl uppercase flex gap-1">
          <span>{name}</span>
          <span>({symbol})</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#888]">Total Value</p>
        <div className="flex items-center gap-2">
          <span className="text-3xl">${total_price.toFixed(2)}</span>
          <span className="text-lg flex items-center gap-2">
            {getIcon(profitPercentage(current_price, total_price))}
            {profitPercentage(current_price, total_price).toFixed(2)}%
          </span>
        </div>
        <p
          className={`text-xs ${
            profitPercentage(current_price, total_price) > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {grabProtfitLoss(current_price, total_price)}
        </p>
        <p className="text-sm text-[#888]">Purchased {purchaseDate}</p>
      </div>
    </div>
  );
}

export default PortfolioCoinInfo;
