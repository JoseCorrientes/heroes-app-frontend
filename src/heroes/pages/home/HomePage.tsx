import { useContext, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { CustomJumbotron } from "../../../components/custom/CustomJumbotron";
import { HeroStats } from "../../components/HeroStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroGrid } from "../../components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useSearchParams } from "react-router";
import { useHeroSummary } from "../../hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

// interface Hero {
//   id: string;
//   name: string;
//   alias: string;
//   powers: string[];
//   description: string;
//   strength: number;
//   team: string;
//   image: string;
// }

export const HomePage = () => {
  const { favoriteCount, favorites } = useContext(FavoriteHeroContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const selectedCategory = useMemo(() => {
    const validCategories = ["all", "hero", "villain"];
    return validCategories.includes(category) ? category : "all";
  }, [category]);

  const [searchTerm] = useState("");

  const { data: heroResponse } = usePaginatedHero({
    page: +page,
    limit: +limit,
    category: selectedCategory,
  });
  const { data: summaryResponse } = useHeroSummary();

  const filteredHeroes =
    heroResponse &&
    heroResponse.heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.powers.some((power) =>
          power.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        hero.team.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <>
      {!heroResponse && <h1>Universo de SuperHéroes se esta cargando...</h1>}
      {heroResponse && heroResponse?.heroes && (
        <>
          {/* Header */}
          <CustomJumbotron
            title="Universo de SuperHéroes"
            description="Descubre, explora y administra superhéroes y villanos"
          />

          {/* BreadCrumbs */}
          <CustomBreadCrumbs currentPage="Super Héroes" />

          {/* Stats Dashboard*/}
          <HeroStats />

          {/* Tabs */}
          <Tabs value={selectedTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="all"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "all");
                    prev.set("category", "all");
                    return prev;
                  })
                }
              >
                Todos los Personajes ({summaryResponse?.totalHeroes ?? []})
              </TabsTrigger>

              <TabsTrigger
                value="favorites"
                className="flex items-center gap-2"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "favorites");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Favoritos {`(${favoriteCount})`}
              </TabsTrigger>
              <TabsTrigger
                value="heroes"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "heroes");
                    prev.set("category", "hero");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Héroes ({summaryResponse?.heroCount})
              </TabsTrigger>
              <TabsTrigger
                value="villains"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "villains");
                    prev.set("category", "villain");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Villanos ({summaryResponse?.villainCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={"all"}>
              <HeroGrid heroes={heroResponse?.heroes ?? []} />
            </TabsContent>

            <TabsContent value={"favorites"}>
              <HeroGrid heroes={favorites ?? []} />
            </TabsContent>
            <TabsContent value={"heroes"}>
              <HeroGrid heroes={heroResponse?.heroes ?? []} />
            </TabsContent>
            <TabsContent value={"villains"}>
              <HeroGrid heroes={heroResponse?.heroes ?? []} />
            </TabsContent>
          </Tabs>

          {/* No Results */}
          {filteredHeroes?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No heroes found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or add a new hero to the
                database.
              </p>
            </div>
          )}
          {/* Pagination */}
          {selectedTab !== "favorites" && (
            <CustomPagination totalPages={heroResponse?.pages ?? 1} />
          )}
        </>
      )}
    </>
  );
};
