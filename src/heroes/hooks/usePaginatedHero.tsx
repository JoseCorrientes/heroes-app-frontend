import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

interface Props {
  page: number;
  limit?: number;
  category: string;
}

export const usePaginatedHero = ({
  page,
  limit = 6,
  category = "all",
}: Props) => {
  return useQuery({
    queryKey: ["heroes", { category, limit, page }],
    queryFn: () => getHeroesByPageAction({ category, page, limit }),
    staleTime: 1000 * 60 * 5, //5 minutos
  });
};
