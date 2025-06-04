import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchType, useRecipeSearch } from "./use-recipe-search";

vi.mock("swr");
vi.mock("@/services/recipe/recipe.service.instance", () => ({
  recipeServiceInstance: {
    getRecipesByIngredient: vi.fn(),
    getRecipesByName: vi.fn(),
  },
}));

describe("useRecipeSearch", () => {
  const mockRecipes = [
    { ...mockRecipeEntity, name: "Pasta" },
    { ...mockRecipeEntity, id: "2", name: "Pizza" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty list, false loading and null error when searchQuery is empty", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeSearch(""));

    expect(result.current.recipes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("fetches by ingredient when searchType is INGREDIENT", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: mockRecipes,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() =>
      useRecipeSearch("Ingredient 1", SearchType.INGREDIENT)
    );

    expect(result.current.recipes).toEqual(mockRecipes);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("fetches by name when searchType is NAME", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: mockRecipes,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() =>
      useRecipeSearch("Pizza", SearchType.NAME)
    );

    expect(result.current.recipes).toEqual(mockRecipes);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("returns loading state correctly", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() =>
      useRecipeSearch("Ingredient 1", SearchType.INGREDIENT)
    );

    expect(result.current.recipes).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("returns error state correctly", () => {
    const error = new Error("Fetch error");
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
      error,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() =>
      useRecipeSearch("Pizza", SearchType.NAME)
    );

    expect(result.current.recipes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
  });
});
