type PortfolioCoinData = {
  symbol: string;
  data: string;
  title: string;
  titleTwo: string;
  ProgressBar?: React.ReactElement;
  dataPercentage: string;
};

function PortfolioCoinData({
  symbol,
  data,
  title,
  titleTwo,
  ProgressBar,
  dataPercentage,
}: PortfolioCoinData) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border p-2">
        <p className="text-xl">
          {symbol}
          {data}
        </p>
        <p className="text-[#888] text-sm">{title}</p>
      </div>
      <div className="border p-2">
        <div className="flex items-center gap-2 ">
          <p className="text-xl">{dataPercentage}%</p>
          {ProgressBar}
        </div>
        <p className="text-[#888] text-sm">{titleTwo}</p>
      </div>
    </div>
  );
}

export default PortfolioCoinData;
