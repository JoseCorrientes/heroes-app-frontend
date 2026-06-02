import { describe, test, expect } from "vitest";
import { getOneHero } from "./get-one-hero.action";

// console.log(data);

describe("get-one-hero.action", () => {
  test("Should fetch hero data and return with complete image url", async () => {
    const idSlug = "clark-kent";
    const data = await getOneHero({ idSlug });
    const baseURL = import.meta.env.VITE_API_URL;
    expect(data).toStrictEqual({
      id: "1",
      name: "Clark Kent",
      slug: "clark-kent",
      alias: "Superman",
      powers: [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad",
      ],
      description:
        "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: "Liga de la Justicia",
      image: "http://localhost:3001/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
    expect(data.image).toContain(`${baseURL}/images/`);
  });
  test("should throw an error if hero is not found", async () => {
    const idSlug = "none";
    const result = await getOneHero({ idSlug }).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe("Request failed with status code 404");
    });
    expect(result).toBeUndefined();
  });
});
