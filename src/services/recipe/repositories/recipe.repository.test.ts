import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { IRecipeDatasource } from "../datasources/recipe.datasource.interface";
import { IRecipeCategory } from "../entities/recipe-category.entity";
import { IRecipeSearch } from "../entities/recipe-search.entity";
import { RecipeRepository } from "./recipe.repository";

describe(RecipeRepository.name, () => {
  let repository: RecipeRepository;
  let mockDatasource: Mocked<IRecipeDatasource>;

  beforeEach(() => {
    mockDatasource = {
      getRecipesByIngredient: vi.fn(),
      getRecipesByCategory: vi.fn(),
      getAllCategories: vi.fn(),
      getRecipeById: vi.fn(),
    } as unknown as Mocked<IRecipeDatasource>;

    repository = new RecipeRepository(mockDatasource);
  });

  describe("getRecipesByIngredient", () => {
    it("should return recipes by ingredient", async () => {
      const ingredient = "chicken";
      const recipes = await repository.getRecipesByIngredient(ingredient);
      expect(recipes).toEqual(
        mockDatasource.getRecipesByIngredient(ingredient)
      );
    });
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const categories = await repository.getAllCategories();
      expect(categories).toEqual(mockDatasource.getAllCategories());
    });
  });

  describe("getRecipeById", () => {
    it("should return a recipe by id with normalized ingredients", async () => {
      const id = "1";
      mockDatasource.getRecipeById.mockResolvedValue(mockRecipeEntity);

      const recipe = await repository.getRecipeById(id);

      expect(mockDatasource.getRecipeById).toHaveBeenCalledWith(id);
      expect(recipe).toEqual({
        ...mockRecipeEntity,
        ingredients: [
          { ingredient: "Ingredient 1", measure: "1 cup" },
          { ingredient: "Ingredient 2", measure: "2 cups" },
          { ingredient: "Ingredient 3", measure: "3 cups" },
          { ingredient: "Ingredient 4", measure: "4 cups" },
          { ingredient: "Ingredient 5", measure: "5 cups" },
          { ingredient: "Ingredient 6", measure: "6 cups" },
          { ingredient: "Ingredient 7", measure: "7 cups" },
          { ingredient: "Ingredient 8", measure: "8 cups" },
          { ingredient: "Ingredient 9", measure: "9 cups" },
          { ingredient: "Ingredient 10", measure: "10 cups" },
          { ingredient: "Ingredient 11", measure: "11 cups" },
          { ingredient: "Ingredient 12", measure: "12 cups" },
          { ingredient: "Ingredient 13", measure: "13 cups" },
          { ingredient: "Ingredient 14", measure: "14 cups" },
          { ingredient: "Ingredient 15", measure: "15 cups" },
        ],
      });
    });
  });

  describe("getRecipesGroupedByCategory", () => {
    it("should return grouped recipes by category", async () => {
      const mockCategories: IRecipeCategory[] = [
        {
          id: "1",
          name: "Desserts",
          thumb: "dessert.jpg",
          description: "Desserts",
        },
        {
          id: "2",
          name: "Appetizers",
          thumb: "appetizer.jpg",
          description: "Appetizers",
        },
      ];

      const mockDessertRecipes: IRecipeSearch[] = [
        { id: "1", name: "Chocolate Cake", thumb: "chocolate-cake.jpg" },
        { id: "2", name: "Apple Pie", thumb: "apple-pie.jpg" },
      ];

      const mockAppetizerRecipes: IRecipeSearch[] = [
        { id: "3", name: "Bruschetta", thumb: "bruschetta.jpg" },
        { id: "4", name: "Stuffed Mushrooms", thumb: "stuffed-mushrooms.jpg" },
      ];

      mockDatasource.getAllCategories.mockResolvedValue(mockCategories);

      mockDatasource.getRecipesByCategory.mockImplementation(
        (categoryName: string) => {
          if (categoryName === "Desserts")
            return Promise.resolve(mockDessertRecipes);
          if (categoryName === "Appetizers")
            return Promise.resolve(mockAppetizerRecipes);
          return Promise.resolve([]);
        }
      );

      const result = await repository.getRecipesGroupedByCategory();

      expect(result).toEqual({
        groups: [
          { category: "Desserts", recipes: mockDessertRecipes },
          { category: "Appetizers", recipes: mockAppetizerRecipes },
        ],
      });

      expect(mockDatasource.getAllCategories).toHaveBeenCalledTimes(1);
      expect(mockDatasource.getRecipesByCategory).toHaveBeenCalledTimes(2);
      expect(mockDatasource.getRecipesByCategory).toHaveBeenCalledWith(
        "Desserts"
      );
      expect(mockDatasource.getRecipesByCategory).toHaveBeenCalledWith(
        "Appetizers"
      );
    });
  });
});
