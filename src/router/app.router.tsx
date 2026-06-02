import { createHashRouter, Navigate } from "react-router";
import { AdminLayout, AdminPage } from "@/admin";
import { HomePage } from "@/heroes";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { SuperheroProfile } from "../heroes/pages/hero/SuperheroProfile";

// export const appRoutes = createBrowserRouter([
export const appRoutes = createHashRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hero/:idSlug",
        element: <SuperheroProfile />,
      },
      {
        path: "search",
        lazy: async () => {
          const { SearchPage } =
            await import("../heroes/pages/search/SearchPage");
          return { Component: SearchPage };
        },
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "admin2",
        lazy: async () => {
          const { AdminPage2 } = await import("../admin/pages/AdminPage2");
          return { Component: AdminPage2 };
        },
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
