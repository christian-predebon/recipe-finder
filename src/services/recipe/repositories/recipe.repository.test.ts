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
    it("should return a recipe by id", async () => {
      const id = "1";
      const recipe = await repository.getRecipeById(id);
      expect(recipe).toEqual(mockDatasource.getRecipeById(id));
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
