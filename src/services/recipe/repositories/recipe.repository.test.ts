import { describe, expect, it, Mocked } from "vitest";
import { IRecipeDatasource } from "../datasources/recipe.datasource.interface";
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

  describe("getRecipesByCategory", () => {
    it("should return recipes by category", async () => {
      const category = "chicken";
      const recipes = await repository.getRecipesByCategory(category);
      expect(recipes).toEqual(mockDatasource.getRecipesByCategory(category));
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
});
