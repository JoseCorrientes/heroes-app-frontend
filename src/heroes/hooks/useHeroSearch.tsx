import { useQuery } from "@tanstack/react-query";
import { searchHeroes } from "../actions/search-heroes.action";

interface Props {
  name?: string;
  team?: string;
  category?: string;
  status?: string;
  universe?: string;
  strength?: string;
}

export const useHeroSearch = ({ name = "", strength }: Props) => {
  return useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroes({ name, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
