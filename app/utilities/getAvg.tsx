const getAvg = (data: number) => {
  return data < 0 ? "text-red-600" : "text-green-600";
};

export default getAvg;
