type ChartContainerProps = {
  children: React.ReactNode;
  name: string;
  price: string;
  date: string;
};

export default function ChartContainer({
  children,
  name,
  price,
  date,
}: ChartContainerProps) {
  return (
    <div className="bg-white100 dark:bg-slate900 w-1/2 pt-4 pr-24 rounded-lg pb-10 pl-5 ">
      <div>
        <p className="text-lg">{name}</p>
        <p className="text-4xl">{`$${price}`}</p>
        <p className="text-lg">{date}</p>
      </div>
      {children}
    </div>
  );
}
