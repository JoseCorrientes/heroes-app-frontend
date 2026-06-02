import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useSearchParams } from "react-router";
import { HeroGrid } from "../../components/HeroGrid";
import { useHeroSearch } from "@/heroes/hooks/useHeroSearch";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data = [] } = useHeroSearch({ name, strength });
  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra superhéroes y villanos"
      />

      {/* BreadCrumbs */}
      <CustomBreadCrumbs currentPage="Búsqueda de SuperHéroes" />

      {/* Stats Dashboard*/}
      <HeroStats />

      {/* SearchControls */}
      <SearchControls />

      <HeroGrid heroes={data} />
    </>
  );
};
