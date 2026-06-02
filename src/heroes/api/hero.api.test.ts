import { test, describe, expect } from "vitest";
import { heroApi } from "./hero.api";

const baseURL = import.meta.env.VITE_API_URL;

describe("HeroApi", () => {
  test("Should be configure pointing to testing server", () => {
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${baseURL}/api/heroes`);
    expect(baseURL).toContain("3001");
  });
});
