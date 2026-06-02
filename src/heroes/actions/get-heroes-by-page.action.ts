import { heroApi } from "../api/hero.api";
import type { HeroesInterface } from "../interfaces/heroes.interface";

interface Props {
  page?: number;
  limit?: number;
  category?: string;
}

const baseURL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async ({
  page = 1,
  limit = 6,
  category = "all",
}: Props): Promise<HeroesInterface> => {
  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 6;

  const { data } = await heroApi.get<HeroesInterface>("/", {
    params: {
      limit: limit,
      offset: limit * (page - 1),
      category: category,
    },
  });

  const heroes = data.heroes.map((item) => ({
    ...item,
    image: `${baseURL}/images/${item.image}`,
  }));

  return { ...data, heroes };
};
