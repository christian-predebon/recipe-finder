import {
  RECIPE_SEARCH_PAGE_DESCRIPTION,
  SEARCH_BUTTON_TEXT,
} from "@/consts/text.const";
import { useRecipeSearch } from "@/hooks/use-recipe-search/use-recipe-search";
import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchPage from "./recipe-search-page";

vi.mock("use-debounce", () => ({
  useDebounce: vi.fn((value) => [value]),
}));

vi.mock("@/hooks/use-recipe-search/use-recipe-search", () => ({
  useRecipeSearch: vi.fn(),
  SearchType: {
    INGREDIENT: "ingredient",
    NAME: "name",
  },
}));

vi.mock("@/components/recipe-search/recipe-search", () => ({
  default: vi.fn(() => <div>RecipeSearch</div>),
}));

vi.mock("@/components/recipe/recipe-search-list/recipe-search-list", () => ({
  default: vi.fn(() => <div>RecipeSearchList</div>),
}));

vi.mock("@/components/error/error", () => ({
  default: vi.fn(() => <div>Error</div>),
}));

describe(SearchPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRecipeSearch).mockReturnValue({
      recipes: [],
      isLoading: false,
      error: null,
    });
  });
  
  it("should show the title", () => {
    render(<SearchPage />);

    const subtitle = screen.getByText(SEARCH_BUTTON_TEXT);

    expect(subtitle).toBeInTheDocument();
  });

  it("should show the description", () => {
    render(<SearchPage />);

    const description = screen.getByText(RECIPE_SEARCH_PAGE_DESCRIPTION);

    expect(description).toBeInTheDocument();
  });

  it("should show error state", () => {
    vi.mocked(useRecipeSearch).mockReturnValue({
      recipes: [],
      isLoading: false,
      error: new Error("Test error"),
    });

    render(<SearchPage />);

    const error = screen.getByText("Error");
    expect(error).toBeInTheDocument();
  });

  it("should show no results message when search returns empty", () => {
    vi.mocked(useRecipeSearch).mockReturnValue({
      recipes: [],
      isLoading: false,
      error: null,
    });

    render(<SearchPage />);

    expect(screen.getByText("RecipeSearch")).toBeInTheDocument();
  });

  it("should show recipe list when search returns results", () => {
    vi.mocked(useRecipeSearch).mockReturnValue({
      recipes: [mockRecipeSearchEntity],
      isLoading: false,
      error: null,
    });

    render(<SearchPage />);

    expect(screen.getByText("RecipeSearch")).toBeInTheDocument();
    expect(screen.getByText("RecipeSearchList")).toBeInTheDocument();
  });
});
