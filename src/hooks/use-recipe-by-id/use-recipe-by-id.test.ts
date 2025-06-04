import { mockRecipeEntity } from "@/tests/fixtures/mock-recipe-entity";
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRecipeById } from "./use-recipe-by-id";

vi.mock("swr");
vi.mock("@/services/recipe/recipe.service.instance", () => ({
  recipeServiceInstance: {
    getRecipeById: vi.fn(),
  },
}));

describe("useRecipeById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null recipe, false loading, and null error when recipeId is undefined", () => {
    const { result } = renderHook(() => useRecipeById(undefined));

    expect(result.current).toEqual({
      recipe: null,
      isLoading: false,
      error: null,
    });
  });

  it("should fetch and return recipe when recipeId is provided", async () => {
    vi.mocked(useSWR).mockReturnValue({
      data: mockRecipeEntity,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeById("1"));

    expect(result.current.recipe).toEqual(mockRecipeEntity);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should return loading state", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeById("1"));
    expect(result.current.recipe).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should return error state when fetcher fails", () => {
    const error = new Error("Network error");

    vi.mocked(useSWR).mockReturnValue({
      data: null,
      isLoading: false,
      error,
    } as unknown as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useRecipeById("1"));
    expect(result.current.recipe).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
  });
});
