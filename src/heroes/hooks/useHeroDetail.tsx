import { useQuery } from "@tanstack/react-query";
import { getOneHero } from "../actions/get-one-hero.action";

interface Props {
  idSlug: string;
}

export const useHeroDetail = ({ idSlug }: Props) => {
  const { data: superheroData, isError } = useQuery({
    queryKey: [`heroes:`, idSlug],
    queryFn: () => getOneHero({ idSlug: idSlug }),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
  });

  return {
    isError,
    superheroData,
  };
};
