import { RECIPE_DETAIL_PAGE_INSTRUCTIONS_TITLE } from "@/consts/text.const";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeDetailInstructions from "./recipe-detail-instructions";

describe(RecipeDetailInstructions.name, () => {
  it("renders the instructions title", () => {
    render(<RecipeDetailInstructions recipeInstructions="Test instructions" />);

    const title = screen.getByText(RECIPE_DETAIL_PAGE_INSTRUCTIONS_TITLE);
    expect(title).toBeInTheDocument();
  });
});
