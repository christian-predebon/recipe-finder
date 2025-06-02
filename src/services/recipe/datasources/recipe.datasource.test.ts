import { mockRecipeDto } from "@/tests/fixtures/mock-recipe-dto";
import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { AxiosInstance } from "axios";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { RecipeDatasource } from "./recipe.datasource";

describe(RecipeDatasource.name, () => {
  let mockAxios: Mocked<AxiosInstance>;
  let datasource: RecipeDatasource;

  beforeEach(() => {
    mockAxios = {
      get: vi.fn(),
    } as unknown as Mocked<AxiosInstance>;

    datasource = new RecipeDatasource(mockAxios);
  });

  describe("getRecipesByIngredient", () => {
    it("should return mapped recipes when API call is successful", async () => {
      const mockResponse = {
        data: {
          meals: [
            {
              idMeal: "1",
              strMeal: "Test Recipe",
              strMealThumb: "test.jpg",
            },
          ],
        },
      };

      mockAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await datasource.getRecipesByIngredient("chicken");

      expect(mockAxios.get).toHaveBeenCalledWith("/filter.php?i=chicken");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "1",
        name: "Test Recipe",
        thumb: "test.jpg",
      });
    });

    it("should throw error when API call fails", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        datasource.getRecipesByIngredient("chicken")
      ).rejects.toThrow();
    });
  });

  describe("getRecipesByCategory", () => {
    it("should return mapped recipes when API call is successful", async () => {
      const mockResponse = {
        data: {
          meals: [
            {
              idMeal: "1",
              strMeal: "Test Recipe",
              strMealThumb: "test.jpg",
            },
          ],
        },
      };

      mockAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await datasource.getRecipesByCategory("beef");

      expect(mockAxios.get).toHaveBeenCalledWith("/filter.php?c=beef");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "1",
        name: "Test Recipe",
        thumb: "test.jpg",
      });
    });

    it("should throw error when API call fails", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(datasource.getRecipesByCategory("beef")).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("getAllCategories", () => {
    it("should return mapped categories when API call is successful", async () => {
      const mockResponse = {
        data: {
          categories: [
            {
              idCategory: "1",
              strCategory: "Beef",
              strCategoryThumb: "beef.jpg",
              strCategoryDescription: "Beef category",
            },
          ],
        },
      };

      mockAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await datasource.getAllCategories();

      expect(mockAxios.get).toHaveBeenCalledWith("/categories.php");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "1",
        name: "Beef",
        thumb: "beef.jpg",
        description: "Beef category",
      });
    });

    it("should throw error when API call fails", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(datasource.getAllCategories()).rejects.toThrow("API Error");
    });
  });

  describe("getRecipeById", () => {
    it("should return mapped recipe when API call is successful", async () => {
      const mockResponse = {
        data: {
          meals: [mockRecipeDto],
        },
      };

      mockAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await datasource.getRecipeById("1");

      expect(mockAxios.get).toHaveBeenCalledWith("/lookup.php?i=1");
      expect(result).toEqual(mockRecipeEntity);
    });

    it("should throw error when API call fails", async () => {
      mockAxios.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(datasource.getRecipeById("1")).rejects.toThrow("API Error");
    });
  });
});
