import { describe, expect, it, Mocked, vi } from "vitest";
import { RecipeService } from "../recipe.service";
import { IRecipeRepository } from "./recipe.repository.interface";

describe(RecipeService.name, () => {
  let service: RecipeService;
  let mockRepository: Mocked<IRecipeRepository>;

  beforeEach(() => {
    mockRepository = {
      getRecipesByIngredient: vi.fn(),
      getRecipesByCategory: vi.fn(),
      getAllCategories: vi.fn(),
      getRecipeById: vi.fn(),
    } as unknown as Mocked<IRecipeRepository>;

    service = new RecipeService(mockRepository);
  });

  describe("getRecipesByIngredient", () => {
    it("should return recipes by ingredient", async () => {
      const ingredient = "chicken";
      const recipes = await service.getRecipesByIngredient(ingredient);
      expect(recipes).toEqual(
        mockRepository.getRecipesByIngredient(ingredient)
      );
    });
  });

  describe("getRecipesByCategory", () => {
    it("should return recipes by category", async () => {
      const category = "Beef";
      const recipes = await service.getRecipesByCategory(category);
      expect(recipes).toEqual(mockRepository.getRecipesByCategory(category));
    });
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const categories = await service.getAllCategories();
      expect(categories).toEqual(mockRepository.getAllCategories());
    });
  });

  describe("getRecipeById", () => {
    it("should return a recipe by id", async () => {
      const id = "1";
      const recipe = await service.getRecipeById(id);
      expect(recipe).toEqual(mockRepository.getRecipeById(id));
    });
  });
});
