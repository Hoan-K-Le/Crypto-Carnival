export const convertToTimeFrame = (day: string) => {
  if (Number(day) <= 14) {
    return day.toString() + "D";
  } else if (day === "max") {
    return day;
  } else {
    day = "1";
    return day + "M";
  }
};
