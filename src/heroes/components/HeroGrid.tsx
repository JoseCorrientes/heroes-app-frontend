import { HeroGridCard } from "./HeroGridCard";
import type { Hero } from "../interfaces/hero.interface";

interface Props {
  heroes: Hero[];
}

export const HeroGrid = ({ heroes }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {heroes &&
        heroes.map((item) => <HeroGridCard key={item.id} hero={item} />)}
    </div>
  );
};
