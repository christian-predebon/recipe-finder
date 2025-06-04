import { IRecipeGroups } from "@/services/recipe/entities/recipe-group.entity";
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRecipeGrouped } from "./use-recipe-grouped";

vi.mock("swr");
vi.mock("@/services/recipe/recipe.service.instance", () => ({
  recipeServiceInstance: {
    getRecipesGroupedByCategory: vi.fn(),
  },
}));

describe("useRecipeGrouped", () => {
  const mockGroupedData: IRecipeGroups = {
    groups: [
      {
        category: "Desserts",
        recipes: [{ id: "1", name: "Tiramisu", thumb: "test.jpg" }],
      },
      {
        category: "Main Dishes",
        recipes: [{ id: "2", name: "Lasagna", thumb: "test.jpg" }],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns groupedRecipes correctly when data is loaded", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: mockGroupedData,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeGrouped());

    expect(result.current.groupedRecipes).toEqual(mockGroupedData.groups);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("returns empty array if no data is returned", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeGrouped());

    expect(result.current.groupedRecipes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("returns loading state correctly", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeGrouped());

    expect(result.current.groupedRecipes).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("returns error state correctly", () => {
    const error = new Error("Failed to fetch grouped recipes");

    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
      error,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeGrouped());

    expect(result.current.groupedRecipes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
  });
});
