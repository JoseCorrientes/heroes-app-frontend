import { test, describe } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/hero.api";

describe("get-heroes-by-page.actions", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  test("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: "1.jpg",
        },
        {
          image: "2.jpg",
        },
      ],
    });

    const response = await getHeroesByPageAction({});
    console.log(response);
  });
});
