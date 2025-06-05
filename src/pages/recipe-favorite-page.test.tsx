import {
  FAVORITE_PAGE_DESCRIPTION,
  FAVORITE_PAGE_TITLE,
} from "@/consts/text.const";
import { useRecipeSaved } from "@/hooks/use-recipe-saved/use-recipe-saved";
import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FavoritePage from "./recipe-favorite-page";

vi.mock("@/hooks/use-recipe-saved/use-recipe-saved", () => ({
  useRecipeSaved: vi.fn(),
}));

vi.mock("@/components/recipe/recipe-search-list/recipe-search-list", () => ({
  default: vi.fn(() => <div>RecipeSearchList</div>),
}));

describe(FavoritePage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRecipeSaved).mockReturnValue({
      recipeSaved: {
        saved: [],
      },
      setRecipeSaved: vi.fn(),
      addRecipeToSaved: vi.fn(),
      removeRecipeFromSaved: vi.fn(),
    });
  });

  it("should show the title", () => {
    render(<FavoritePage />);

    const title = screen.getByText(FAVORITE_PAGE_TITLE);

    expect(title).toBeInTheDocument();
  });

  it("should show the description", () => {
    render(<FavoritePage />);

    const description = screen.getByText(FAVORITE_PAGE_DESCRIPTION);

    expect(description).toBeInTheDocument();
  });

  it("should show only title and description when no recipes are saved", () => {
    render(<FavoritePage />);

    expect(screen.getByText(FAVORITE_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(FAVORITE_PAGE_DESCRIPTION)).toBeInTheDocument();
    expect(screen.queryByText("RecipeSearchList")).not.toBeInTheDocument();
  });

  it("should show recipe list when recipes are saved", () => {
    vi.mocked(useRecipeSaved).mockReturnValue({
      recipeSaved: {
        saved: [mockRecipeSearchEntity],
      },
      setRecipeSaved: vi.fn(),
      addRecipeToSaved: vi.fn(),
      removeRecipeFromSaved: vi.fn(),
    });

    render(<FavoritePage />);

    expect(screen.getByText(FAVORITE_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(FAVORITE_PAGE_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText("RecipeSearchList")).toBeInTheDocument();
  });
});
