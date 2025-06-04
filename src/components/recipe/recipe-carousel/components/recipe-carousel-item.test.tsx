import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { fireEvent, render, screen } from "@testing-library/react";
import RecipeCarouselItem from "./recipe-carousel-item";

const mockHandleRecipeClick = vi.fn();

vi.mock("@/hooks/use-is-small-screen/use-is-small-screen", () => ({
  default: vi.fn().mockReturnValue(false),
}));

describe(RecipeCarouselItem.name, () => {
  it("should render the recipe name", () => {
    render(
      <RecipeCarouselItem
        recipe={mockRecipeSearchEntity}
        handleRecipeClick={mockHandleRecipeClick}
      />
    );

    const recipeName = screen.getByText(mockRecipeSearchEntity.name);

    expect(recipeName).toBeInTheDocument();
  });

  it("should call handleRecipeClick when the recipe is clicked", () => {
    render(
      <RecipeCarouselItem
        recipe={mockRecipeSearchEntity}
        handleRecipeClick={mockHandleRecipeClick}
      />
    );

    const recipeItem = screen.getByText(mockRecipeSearchEntity.name);
    fireEvent.click(recipeItem);

    expect(mockHandleRecipeClick).toHaveBeenCalledWith(
      mockRecipeSearchEntity.id
    );
  });
});
