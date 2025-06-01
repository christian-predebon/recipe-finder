import { AxiosInstance } from "axios";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { RecipeDto } from "../dtos/recipe.dto";
import { IRecipe } from "../entities/recipe.entity";
import { RecipeDatasource } from "./recipe.datasource";

const mockRecipeDto: RecipeDto = {
  idMeal: "1",
  strMeal: "Test Recipe",
  strMealAlternate: null,
  strCategory: "Beef",
  strArea: "American",
  strInstructions: "Test instructions",
  strMealThumb: "test.jpg",
  strTags: "tag1,tag2",
  strYoutube: "https://youtube.com",
  strIngredient1: "Ingredient 1",
  strIngredient2: "Ingredient 2",
  strIngredient3: "Ingredient 3",
  strIngredient4: "Ingredient 4",
  strIngredient5: "Ingredient 5",
  strIngredient6: "Ingredient 6",
  strIngredient7: "Ingredient 7",
  strIngredient8: "Ingredient 8",
  strIngredient9: "Ingredient 9",
  strIngredient10: "Ingredient 10",
  strIngredient11: "Ingredient 11",
  strIngredient12: "Ingredient 12",
  strIngredient13: "Ingredient 13",
  strIngredient14: "Ingredient 14",
  strIngredient15: "Ingredient 15",
  strIngredient16: null,
  strIngredient17: null,
  strIngredient18: null,
  strIngredient19: null,
  strIngredient20: null,
  strMeasure1: "1 cup",
  strMeasure2: "2 cups",
  strMeasure3: "3 cups",
  strMeasure4: "4 cups",
  strMeasure5: "5 cups",
  strMeasure6: "6 cups",
  strMeasure7: "7 cups",
  strMeasure8: "8 cups",
  strMeasure9: "9 cups",
  strMeasure10: "10 cups",
  strMeasure11: "11 cups",
  strMeasure12: "12 cups",
  strMeasure13: "13 cups",
  strMeasure14: "14 cups",
  strMeasure15: "15 cups",
  strMeasure16: null,
  strMeasure17: null,
  strMeasure18: null,
  strMeasure19: null,
  strMeasure20: null,
  strSource: null,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

const mockRecipeEntity: IRecipe = {
  id: "1",
  name: "Test Recipe",
  alternateName: null,
  category: "Beef",
  area: "American",
  instructions: "Test instructions",
  thumb: "test.jpg",
  tags: "tag1,tag2",
  youtube: "https://youtube.com",
  ingredient1: "Ingredient 1",
  ingredient2: "Ingredient 2",
  ingredient3: "Ingredient 3",
  ingredient4: "Ingredient 4",
  ingredient5: "Ingredient 5",
  ingredient6: "Ingredient 6",
  ingredient7: "Ingredient 7",
  ingredient8: "Ingredient 8",
  ingredient9: "Ingredient 9",
  ingredient10: "Ingredient 10",
  ingredient11: "Ingredient 11",
  ingredient12: "Ingredient 12",
  ingredient13: "Ingredient 13",
  ingredient14: "Ingredient 14",
  ingredient15: "Ingredient 15",
  ingredient16: null,
  ingredient17: null,
  ingredient18: null,
  ingredient19: null,
  ingredient20: null,
  measure1: "1 cup",
  measure2: "2 cups",
  measure3: "3 cups",
  measure4: "4 cups",
  measure5: "5 cups",
  measure6: "6 cups",
  measure7: "7 cups",
  measure8: "8 cups",
  measure9: "9 cups",
  measure10: "10 cups",
  measure11: "11 cups",
  measure12: "12 cups",
  measure13: "13 cups",
  measure14: "14 cups",
  measure15: "15 cups",
  measure16: null,
  measure17: null,
  measure18: null,
  measure19: null,
  measure20: null,
  source: null,
  imageSource: null,
  creativeCommonsConfirmed: null,
  dateModified: null,
};

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
