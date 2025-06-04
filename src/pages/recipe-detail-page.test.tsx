import { useRecipeById } from "@/hooks/use-recipe-by-id/use-recipe-by-id";
import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecipeDetailPage from "./recipe-detail-page";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(() => ({ id: "1" })),
}));

vi.mock("@/hooks/use-recipe-by-id/use-recipe-by-id", () => ({
  useRecipeById: vi.fn(),
}));

vi.mock("@/components/error/error", () => ({
  default: vi.fn(() => <div>Error</div>),
}));

vi.mock("@/components/recipe-detail/recipe-detail-ingredients", () => ({
  default: vi.fn(() => <div>RecipeDetailIngredients</div>),
}));

vi.mock("@/components/recipe-detail/recipe-detail-instructions", () => ({
  default: vi.fn(() => <div>RecipeDetailInstructions</div>),
}));

vi.mock("@/components/recipe-detail/recipe-detail-video", () => ({
  default: vi.fn(() => <div>RecipeDetailVideo</div>),
}));

vi.mock("@/components/skeleton/recipe-detail-skeleton", () => ({
  default: vi.fn(() => <div>RecipeDetailSkeleton</div>),
}));

describe(RecipeDetailPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRecipeById).mockReturnValue({
      recipe: null,
      isLoading: false,
      error: null,
    });
  });

  it("should show loading state", () => {
    vi.mocked(useRecipeById).mockReturnValue({
      recipe: null,
      isLoading: true,
      error: null,
    });

    render(<RecipeDetailPage />);

    const loadingSkeleton = screen.getByText("RecipeDetailSkeleton");

    expect(loadingSkeleton).toBeInTheDocument();
  });

  it("should show error state", () => {
    vi.mocked(useRecipeById).mockReturnValue({
      recipe: null,
      isLoading: false,
      error: null,
    });

    render(<RecipeDetailPage />);

    const error = screen.getByText("Error");
    expect(error).toBeInTheDocument();
  });

  it("should show not found error when recipe is null", () => {
    vi.mocked(useRecipeById).mockReturnValue({
      recipe: null,
      isLoading: false,
      error: null,
    });

    render(<RecipeDetailPage />);

    const error = screen.getByText("Error");
    expect(error).toBeInTheDocument();
  });

  it("should render recipe details when data is loaded", () => {
    vi.mocked(useRecipeById).mockReturnValue({
      recipe: mockRecipeEntity,
      isLoading: false,
      error: null,
    });

    render(<RecipeDetailPage />);

    expect(screen.getByText("RecipeDetailIngredients")).toBeInTheDocument();
    expect(screen.getByText("RecipeDetailInstructions")).toBeInTheDocument();
    expect(screen.getByText("RecipeDetailVideo")).toBeInTheDocument();
  });
});
