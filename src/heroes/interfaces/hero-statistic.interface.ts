import type { Hero } from "./hero.interface";

export interface HeroStatistic {
  totalHeroes: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
