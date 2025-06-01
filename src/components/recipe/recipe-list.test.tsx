import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import RecipeList, { RECIPE_LIST_TITLE } from "./recipe-list";

const navigateSpy = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => navigateSpy,
}));

describe(RecipeList.name, () => {
  const recipes = [
    {
      id: "1",
      name: "Recipe 1",
      thumb: "fake-image-url",
    },
  ];

  it("renders correctly the title", () => {
    render(<RecipeList recipes={recipes} />);

    expect(screen.getByText(RECIPE_LIST_TITLE)).toBeInTheDocument();
  });

  it("renders correctly the recipes", () => {
    render(<RecipeList recipes={recipes} />);

    expect(screen.getByText(recipes[0].name)).toBeInTheDocument();
  });

  it("navigates to the recipe page when clicking on a recipe", () => {
    render(<RecipeList recipes={recipes} />);

    const recipe = screen.getByText(recipes[0].name);
    fireEvent.click(recipe);

    expect(navigateSpy).toHaveBeenCalledWith(`/recipe/${recipes[0].id}`);
  });
});
