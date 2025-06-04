import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeSearchList from "./recipe-search-list";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock(
  "@/components/recipe/recipe-carousel/components/recipe-carousel-item",
  () => ({
    default: vi.fn(({ handleRecipeClick, recipe }) => (
      <div onClick={() => handleRecipeClick(recipe.id)}>{recipe.name}</div>
    )),
  })
);

describe(RecipeSearchList.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the recipe search list", () => {
    render(<RecipeSearchList recipes={[mockRecipeSearchEntity]} />);

    const recipeName = screen.getByText(mockRecipeSearchEntity.name);

    expect(recipeName).toBeInTheDocument();
  });

  it("should call handleRecipeClick when recipe is clicked", () => {
    render(<RecipeSearchList recipes={[mockRecipeSearchEntity]} />);

    const recipeItem = screen.getByText(mockRecipeSearchEntity.name);
    fireEvent.click(recipeItem);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/recipe/${mockRecipeSearchEntity.id}`
    );
  });
});
