import { mockRecipeSearchEntity } from "@/tests/fixtures/mock-recipe-search-entity";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRecipeSaved } from "./use-recipe-saved";

let mockState = { saved: [] };
const mockSetAtom = vi.fn((updater) => {
  mockState = typeof updater === "function" ? updater(mockState) : updater;
  return mockState;
});

vi.mock("jotai", () => ({
  useAtom: () => [mockState, mockSetAtom],
}));

describe(useRecipeSaved.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = { saved: [] };
  });

  it("should initialize with empty saved recipes", () => {
    const { result } = renderHook(() => useRecipeSaved());

    expect(result.current.recipeSaved).toEqual({ saved: [] });
    expect(typeof result.current.setRecipeSaved).toBe("function");
    expect(typeof result.current.addRecipeToSaved).toBe("function");
    expect(typeof result.current.removeRecipeFromSaved).toBe("function");
  });

  it("should add a recipe to saved recipes", () => {
    const { result } = renderHook(() => useRecipeSaved());

    act(() => {
      result.current.addRecipeToSaved(mockRecipeSearchEntity);
    });

    expect(mockState).toEqual({ saved: [mockRecipeSearchEntity] });
  });

  it("should add multiple recipes to saved recipes", () => {
    const { result } = renderHook(() => useRecipeSaved());
    const recipe1 = { ...mockRecipeSearchEntity, name: "Test Recipe 1" };
    const recipe2 = {
      ...mockRecipeSearchEntity,
      id: "2",
      name: "Test Recipe 2",
    };

    act(() => {
      result.current.addRecipeToSaved(recipe1);
    });

    expect(mockState).toEqual({ saved: [recipe1] });

    act(() => {
      result.current.addRecipeToSaved(recipe2);
    });

    expect(mockState).toEqual({ saved: [recipe1, recipe2] });
  });

  it("should remove a recipe from saved recipes", () => {
    const { result } = renderHook(() => useRecipeSaved());
    const recipe1 = { ...mockRecipeSearchEntity, name: "Test Recipe 1" };
    const recipe2 = {
      ...mockRecipeSearchEntity,
      id: "2",
      name: "Test Recipe 2",
    };

    act(() => {
      result.current.addRecipeToSaved(recipe1);
      result.current.addRecipeToSaved(recipe2);
    });

    act(() => {
      result.current.removeRecipeFromSaved(recipe1);
    });

    expect(mockState).toEqual({ saved: [recipe2] });
  });

  it("should not modify saved recipes when removing non-existent recipe", () => {
    const { result } = renderHook(() => useRecipeSaved());
    const recipe = { ...mockRecipeSearchEntity, name: "Test Recipe" };
    const nonExistentRecipe = {
      ...mockRecipeSearchEntity,
      id: "2",
      name: "Non-existent Recipe",
    };

    act(() => {
      result.current.addRecipeToSaved(recipe);
    });

    act(() => {
      result.current.removeRecipeFromSaved(nonExistentRecipe);
    });

    expect(mockState).toEqual({ saved: [recipe] });
  });
});
