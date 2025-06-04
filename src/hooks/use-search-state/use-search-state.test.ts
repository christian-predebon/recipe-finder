import { SearchType } from "@/hooks/use-recipe-search/use-recipe-search";
import { act, renderHook } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { useSearchState } from "./use-search-state";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe("useSearchState", () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    search: "",
    pathname: "/",
    hash: "",
    state: null,
    key: "default",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should initialize with empty search query and default search type", () => {
    const { result } = renderHook(() => useSearchState());

    expect(result.current.searchQuery).toBe("");
    expect(result.current.searchType).toBe(SearchType.INGREDIENT);
  });

  it("should initialize with search query from URL", () => {
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      search: "?q=test",
    });

    const { result } = renderHook(() => useSearchState());

    expect(result.current.searchQuery).toBe("test");
  });

  it("should initialize with search type from URL", () => {
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      search: "?type=name",
    });

    const { result } = renderHook(() => useSearchState());

    expect(result.current.searchType).toBe(SearchType.NAME);
  });

  it("should update search query and URL when handleSearchQueryChange is called", () => {
    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchQueryChange("new query");
    });

    expect(result.current.searchQuery).toBe("new query");
    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "q=new+query" },
      { replace: true }
    );
  });

  it("should remove search query from URL when handleSearchQueryChange is called with empty string", () => {
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      search: "?q=old+query",
    });

    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchQueryChange("");
    });

    expect(result.current.searchQuery).toBe("");
    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "" },
      { replace: true }
    );
  });

  it("should update search type and URL when handleSearchTypeChange is called", () => {
    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchTypeChange(SearchType.NAME);
    });

    expect(result.current.searchType).toBe(SearchType.NAME);
    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "type=name" },
      { replace: true }
    );
  });

  it("should preserve existing URL parameters when updating search query", () => {
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      search: "?type=name",
    });

    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchQueryChange("new query");
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "type=name&q=new+query" },
      { replace: true }
    );
  });

  it("should preserve existing URL parameters when updating search type", () => {
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      search: "?q=test",
    });

    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchTypeChange(SearchType.NAME);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "q=test&type=name" },
      { replace: true }
    );
  });
});
