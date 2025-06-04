import { IRecipeGroup } from "@/services/recipe/entities/recipe-group.entity";
import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipeGroups from "./recipe-groups";

const mockGroupedRecipes: IRecipeGroup[] = [
  {
    category: "Breakfast",
    recipes: [mockRecipeSearchEntity],
  },
];

vi.mock("@/components/recipe/recipe-carousel/recipe-carousel", () => ({
  default: vi.fn(() => <div>RecipeCarousel</div>),
}));

describe(RecipeGroups.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render a RecipeCarousel for each recipe group", () => {
    render(<RecipeGroups groupedRecipes={mockGroupedRecipes} />);

    const carousels = screen.getAllByText("RecipeCarousel");
    expect(carousels).toHaveLength(mockGroupedRecipes.length);
  });
});
