import { heroApi } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

const urlServer = import.meta.env.VITE_API_URL;

interface Options {
  name?: string;
  team?: string;
  category?: string;
  status?: string;
  universe?: string;
  strength?: string;
}

export const searchHeroes = async ({
  name,
  team,
  category,
  status,
  universe,
  strength,
}: Options): Promise<Hero[] | undefined> => {
  if (!name && !team && !category && !status && !universe && !strength)
    return [];

  console.log({ name });

  const { data } = await heroApi.get<Hero[]>("/search", {
    params: {
      name,
      team,
      category,
      status,
      universe,
      strength,
    },
  });

  return data.map((item) => ({
    ...item,
    image: `${urlServer}/images/${item.image}`,
  }));
};
