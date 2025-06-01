import * as useRecipeCategories from "@/hooks/use-recipes-categories/use-recipe-categories";
import { IRecipeCategory } from "@/services/recipe/entities/recipe-category.entity";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import RecipeCategories, {
  ALL_CATEGORIES_BUTTON_TEXT,
  CATEGORIES_TITLE,
} from "./recipe-categories";

const onCategorySelectSpy = vi.fn();

const mockCategories: IRecipeCategory[] = [
  {
    id: "1",
    name: "Beef",
    thumb: "beef.jpg",
    description: "Beef dishes",
  },
  {
    id: "2",
    name: "Chicken",
    thumb: "chicken.jpg",
    description: "Chicken dishes",
  },
];

describe(RecipeCategories.name, () => {
  beforeEach(() => {
    vi.spyOn(useRecipeCategories, "useRecipeCategories").mockReturnValue({
      categories: mockCategories,
    });
  });

  it("renders correctly the title", () => {
    render(
      <RecipeCategories
        onCategorySelect={onCategorySelectSpy}
        selectedCategory={null}
      />
    );

    expect(screen.getByText(CATEGORIES_TITLE)).toBeInTheDocument();
  });

  it("renders correctly the categories", () => {
    render(
      <RecipeCategories
        onCategorySelect={onCategorySelectSpy}
        selectedCategory={null}
      />
    );

    expect(
      screen.getByText(mockCategories[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockCategories[1].name)
    ).toBeInTheDocument();
  });

  it("renders correctly the selected category", () => {
    render(
      <RecipeCategories
        onCategorySelect={onCategorySelectSpy}
        selectedCategory={mockCategories[0].name}
      />
    );

    expect(screen.getByText(mockCategories[0].name)).toHaveClass(
      "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"
    );
  });

  it("renders correctly the all categories button", () => {
    render(
      <RecipeCategories
        onCategorySelect={onCategorySelectSpy}
        selectedCategory={null}
      />
    );

    expect(screen.getByText(ALL_CATEGORIES_BUTTON_TEXT)).toBeInTheDocument();
  });
});
