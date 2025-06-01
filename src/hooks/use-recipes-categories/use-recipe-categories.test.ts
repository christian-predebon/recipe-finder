import { IRecipeCategory } from "@/services/recipe/entities/recipe-category.entity";
import { renderHook } from "@testing-library/react";
import { useAtomValue } from "jotai";
import { describe, it } from "vitest";
import { useRecipeCategories } from "./use-recipe-categories";

vi.mock("jotai", () => ({
  useAtomValue: vi.fn(),
}));

vi.mock("@/states/recipe-categories/recipe-categories.state", () => ({
  RecipeCategoriesAtom: {},
}));

const mockUseAtomValue = vi.mocked(useAtomValue);

describe(useRecipeCategories.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return categories from the atom", () => {
    const mockCategories: IRecipeCategory[] = [
      {
        id: "1",
        name: "Appetizers",
        thumb: "appetizers.jpg",
        description: "Appetizers",
      },
      {
        id: "2",
        name: "Main Courses",
        thumb: "main-courses.jpg",
        description: "Main Courses",
      },
    ];

    mockUseAtomValue.mockReturnValue(mockCategories);

    const { result } = renderHook(() => useRecipeCategories());

    expect(result.current.categories).toEqual(mockCategories);
    expect(mockUseAtomValue).toHaveBeenCalledTimes(1);
  });
});
