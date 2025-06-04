import {
  RECIPE_PAGE_DESCRIPTION,
  RECIPE_PAGE_TITLE,
} from "@/consts/text.const";
import { useRecipeGrouped } from "@/hooks/use-recipe-grouped/use-recipe-grouped";
import { IRecipeGroup } from "@/services/recipe/entities/recipe-group.entity";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecipePage from "./recipe-page";

vi.mock("@/hooks/use-recipe-grouped/use-recipe-grouped", () => ({
  useRecipeGrouped: vi.fn(),
}));

vi.mock("@/components/recipe/recipe-groups", () => ({
  default: vi.fn(() => <div>RecipeGroups</div>),
}));

vi.mock("@/components/error/error", () => ({
  default: vi.fn(() => <div>Error</div>),
}));

vi.mock("@/components/skeleton/recipe-page-skeleton", () => ({
  default: vi.fn(() => <div>RecipePageSkeleton</div>),
}));

describe(RecipePage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRecipeGrouped).mockReturnValue({
      groupedRecipes: [],
      isLoading: false,
      error: null,
    });
  });

  it("should show the title", () => {
    render(<RecipePage />);

    const title = screen.getByText(RECIPE_PAGE_TITLE);

    expect(title).toBeInTheDocument();
  });

  it("should show the description", () => {
    render(<RecipePage />);

    const description = screen.getByText(RECIPE_PAGE_DESCRIPTION);

    expect(description).toBeInTheDocument();
  });

  it("should show loading state", () => {
    vi.mocked(useRecipeGrouped).mockReturnValue({
      groupedRecipes: [] as IRecipeGroup[],
      isLoading: true,
      error: null,
    });

    render(<RecipePage />);

    const loadingSkeleton = screen.getByText("RecipePageSkeleton");

    expect(loadingSkeleton).toBeInTheDocument();
  });

  it("should show the error", () => {
    vi.mocked(useRecipeGrouped).mockReturnValue({
      groupedRecipes: [] as IRecipeGroup[],
      isLoading: false,
      error: new Error("Test error"),
    });

    render(<RecipePage />);

    const error = screen.getByText("Error");

    expect(error).toBeInTheDocument();
  });

  it("should render recipe groups when data is loaded", () => {
    vi.mocked(useRecipeGrouped).mockReturnValue({
      groupedRecipes: [{ category: "Breakfast", recipes: [] }],
      isLoading: false,
      error: null,
    });

    render(<RecipePage />);

    expect(screen.getByText("RecipeGroups")).toBeInTheDocument();
  });
});
