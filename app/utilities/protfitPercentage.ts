export const profitPercentage = (currentPrice: number, boughtPrice: number) => {
  const grabProfit = currentPrice - boughtPrice;
  return (grabProfit / boughtPrice) * 100;
};
