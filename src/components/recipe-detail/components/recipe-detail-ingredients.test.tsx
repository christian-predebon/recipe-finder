import { RECIPE_DETAIL_PAGE_INGREDIENTS_TITLE } from "@/consts/text.const";
import { IRecipe } from "@/services/recipe/entities/recipe.entity";
import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeDetailIngredients from "./recipe-detail-ingredients";

const mockRecipe: IRecipe = {
  ...mockRecipeEntity,
  ingredients: [
    { ingredient: "Ingredient 1", measure: "100g" },
    { ingredient: "Ingredient 2", measure: "2 cups" },
    { ingredient: "Ingredient 3", measure: "1 tbsp" },
  ],
} as IRecipe;

describe(RecipeDetailIngredients.name, () => {
  it("renders the ingredients title", () => {
    render(<RecipeDetailIngredients recipe={mockRecipe} />);

    const title = screen.getByText(RECIPE_DETAIL_PAGE_INGREDIENTS_TITLE);

    expect(title).toBeInTheDocument();
  });

  it.each(mockRecipe.ingredients ?? [])(
    "renders ingredient %s",
    ({ ingredient, measure }) => {
      render(<RecipeDetailIngredients recipe={mockRecipe} />);

      const measureText = screen.getByText(`${measure}`);
      const ingredientText = screen.getByText(`${ingredient}`);

      expect(measureText).toBeInTheDocument();
      expect(ingredientText).toBeInTheDocument();
    }
  );

  it("handles empty ingredients array", () => {
    const recipeWithNoIngredients = {
      ...mockRecipe,
      ingredients: [],
    };

    render(<RecipeDetailIngredients recipe={recipeWithNoIngredients} />);

    const title = screen.getByText(RECIPE_DETAIL_PAGE_INGREDIENTS_TITLE);
    expect(title).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("handles undefined ingredients", () => {
    const recipeWithUndefinedIngredients = {
      ...mockRecipe,
      ingredients: undefined,
    };

    render(<RecipeDetailIngredients recipe={recipeWithUndefinedIngredients} />);

    const title = screen.getByText(RECIPE_DETAIL_PAGE_INGREDIENTS_TITLE);
    expect(title).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
