import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../interfaces/hero.interface";

interface FavoriteHeroContext {
  //piezas de estado
  favorites: Hero[];
  favoriteCount: number;

  //metodos
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  const toggleFavorites = (hero: Hero) => {
    console.log("estoy en toggle favorite");
    const heroExist = favorites.find((item: Hero) => item.id === hero.id);
    if (heroExist) {
      const newFavorites = favorites.filter(
        (item: Hero) => item.id !== hero.id,
      );
      setFavorites(newFavorites);
      return;
    }
    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) =>
    favorites.some((item) => item.id === hero.id);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorites,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
