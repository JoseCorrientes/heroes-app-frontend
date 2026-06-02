import { heroApi } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

interface Props {
  idSlug: string;
}

export const getOneHero = async ({ idSlug }: Props): Promise<Hero> => {
  const { data } = await heroApi.get<Hero>(`/${idSlug}`);

  const base_url = import.meta.env.VITE_API_URL;
  const imageURL = `${base_url}/images/${data.image}`;

  return {
    ...data,
    image: imageURL,
  };
};
