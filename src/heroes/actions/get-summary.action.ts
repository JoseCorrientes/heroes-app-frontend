import { heroApi } from "../api/hero.api";
import type { HeroStatistic } from "../interfaces/hero-statistic.interface";

export const getSummary = async (): Promise<HeroStatistic> => {
  const { data } = await heroApi.get<HeroStatistic>("/summary");
  return data;
};
