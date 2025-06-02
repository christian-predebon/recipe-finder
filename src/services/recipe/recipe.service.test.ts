import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { Mocked, beforeEach, describe, expect, it, vi } from "vitest";
import { IRecipeSearch } from "./entities/recipe-search.entity";
import { RecipeService } from "./recipe.service";
import { IRecipeRepository } from "./repositories/recipe.repository.interface";

describe(RecipeService.name, () => {
  let service: RecipeService;
  let mockRepository: Mocked<IRecipeRepository>;

  beforeEach(() => {
    mockRepository = {
      getRecipesByIngredient: vi.fn(),
      getRecipesByCategory: vi.fn(),
      getAllCategories: vi.fn(),
      getRecipeById: vi.fn(),
      getRecipesGroupedByCategory: vi.fn(),
    } as unknown as Mocked<IRecipeRepository>;

    service = new RecipeService(mockRepository);
  });

  describe("getRecipesByIngredient", () => {
    it("should return recipes by ingredient", async () => {
      const ingredient = "chicken";
      const mockRecipes: IRecipeSearch[] = [
        { id: "1", name: "Chicken Curry", thumb: "chicken-curry.jpg" },
      ];

      mockRepository.getRecipesByIngredient.mockResolvedValue(mockRecipes);

      const result = await service.getRecipesByIngredient(ingredient);

      expect(mockRepository.getRecipesByIngredient).toHaveBeenCalledWith(
        ingredient
      );
      expect(result).toEqual(mockRecipes);
    });
  });

  describe("getRecipesByCategory", () => {
    it("should return recipes by category", async () => {
      const category = "Beef";
      const mockRecipes: IRecipeSearch[] = [
        { id: "2", name: "Beef Stroganoff", thumb: "beef-stroganoff.jpg" },
      ];

      mockRepository.getRecipesByCategory.mockResolvedValue(mockRecipes);

      const result = await service.getRecipesByCategory(category);

      expect(mockRepository.getRecipesByCategory).toHaveBeenCalledWith(
        category
      );
      expect(result).toEqual(mockRecipes);
    });
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const mockCategories = [
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

      mockRepository.getAllCategories.mockResolvedValue(mockCategories);

      const result = await service.getAllCategories();

      expect(mockRepository.getAllCategories).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });

  describe("getRecipeById", () => {
    it("should return a recipe by id", async () => {
      const id = "123";

      mockRepository.getRecipeById.mockResolvedValue(mockRecipeEntity);

      const result = await service.getRecipeById(id);

      expect(mockRepository.getRecipeById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRecipeEntity);
    });
  });

  describe("getRecipesGroupedByCategory", () => {
    it("should return recipes grouped by category", async () => {
      const mockGroups = {
        groups: [
          {
            category: "Desserts",
            recipes: [
              { id: "1", name: "Chocolate Cake", thumb: "chocolate-cake.jpg" },
            ],
          },
          {
            category: "Appetizers",
            recipes: [{ id: "2", name: "Bruschetta", thumb: "bruschetta.jpg" }],
          },
        ],
      };

      mockRepository.getRecipesGroupedByCategory.mockResolvedValue(mockGroups);

      const result = await service.getRecipesGroupedByCategory();

      expect(mockRepository.getRecipesGroupedByCategory).toHaveBeenCalled();
      expect(result).toEqual(mockGroups);
    });
  });
});
