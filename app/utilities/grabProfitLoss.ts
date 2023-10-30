export const grabProtfitLoss = (currentPrice: number, boughtPrice: number) => {
  return `${(currentPrice - boughtPrice).toFixed(2)}$`;
};
