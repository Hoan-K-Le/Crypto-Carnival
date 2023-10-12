export const changeBgColor = (
  data: number,
  bg1: string,
  bg2: string
): string => {
  return data < 0 ? `bg-[#${bg1}]` : `bg-[#${bg2}]`;
};
