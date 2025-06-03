import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { fireEvent, render, screen } from "@testing-library/react";
import RecipeCarouselItem from "./recipe-carousel-item";

const mockHandleRecipeClick = vi.fn();

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

describe(RecipeCarouselItem.name, () => {
  it("should render the recipe name", () => {
    render(
      <RecipeCarouselItem
        recipe={mockRecipeSearchEntity}
        handleRecipeClick={mockHandleRecipeClick}
      />
    );

    expect(screen.getByText(mockRecipeSearchEntity.name)).toBeInTheDocument();
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
