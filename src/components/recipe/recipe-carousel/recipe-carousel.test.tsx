import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecipeCarousel from "./recipe-carousel";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@/hooks/use-recipe-carousel/use-recipe-carousel", () => ({
  useRecipeCarousel: () => ({
    carouselRef: { current: null },
    showLeftArrow: true,
    showRightArrow: true,
    handleScroll: vi.fn(),
    scroll: vi.fn(),
  }),
}));

vi.mock("./components/recipe-carousel-item", () => ({
  default: vi.fn(() => <div>RecipeCarouselItem</div>),
}));

vi.mock("./components/recipe-carousel-navigation", () => ({
  default: vi.fn(() => <div>RecipeCarouselNavigation</div>),
}));

describe(RecipeCarousel.name, () => {
  const mockRecipes: IRecipeSearch[] = [
    { id: "1", name: "Recipe 1", thumb: "image1.jpg" },
    { id: "2", name: "Recipe 2", thumb: "image2.jpg" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the category name correctly", () => {
    render(
      <RecipeCarousel categoryName="Test Category" recipes={mockRecipes} />
    );

    const categoryName = screen.getByText("Test Category");
    expect(categoryName).toBeInTheDocument();
  });

  it("renders the recipe carousel navigation", () => {
    render(
      <RecipeCarousel categoryName="Test Category" recipes={mockRecipes} />
    );

    const navigation = screen.getByText("RecipeCarouselNavigation");

    expect(navigation).toBeInTheDocument();
  });

  it("renders the correct number of recipe items", () => {
    render(
      <RecipeCarousel categoryName="Test Category" recipes={mockRecipes} />
    );

    const recipeItems = screen.getAllByText("RecipeCarouselItem");
    expect(recipeItems).toHaveLength(mockRecipes.length);
  });
});
