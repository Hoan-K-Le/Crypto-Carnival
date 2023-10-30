import { store } from "../store/store";
import { fetchCoinDetails } from "../store/CoinDetailData";

export const fetchCoinById = async (id: string) => {
  try {
    const data = await store.dispatch(fetchCoinDetails(id));
    if (fetchCoinDetails.fulfilled.match(data)) {
      return data.payload;
    }
  } catch (err) {
    console.error(`${err} on fetchCoinById`);
  }
  return null;
};
