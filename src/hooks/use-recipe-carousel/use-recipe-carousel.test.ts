import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { ScrollDirection, useRecipeCarousel } from "./use-recipe-carousel";

describe(useRecipeCarousel.name, () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useRecipeCarousel());

    expect(result.current.showLeftArrow).toBe(false);
    expect(result.current.showRightArrow).toBe(true);
    expect(result.current.carouselRef.current).toBe(null);
  });

  it("should update arrow visibility based on scroll position", () => {
    const { result } = renderHook(() => useRecipeCarousel());

    const mockCarousel = {
      scrollLeft: 0,
      scrollWidth: 1000,
      clientWidth: 500,
    };

    act(() => {
      result.current.carouselRef.current = mockCarousel as HTMLDivElement;
    });

    act(() => {
      result.current.handleScroll();
    });
    expect(result.current.showLeftArrow).toBe(false);
    expect(result.current.showRightArrow).toBe(true);
  });

  it("should scroll left when scroll function is called with 'left' direction", () => {
    const { result } = renderHook(() => useRecipeCarousel());

    const mockScrollBy = vi.fn();
    const mockCarousel = {
      scrollBy: mockScrollBy,
    };

    act(() => {
      result.current.carouselRef.current =
        mockCarousel as unknown as HTMLDivElement;
    });

    act(() => {
      result.current.scroll(ScrollDirection.LEFT);
    });

    expect(mockScrollBy).toHaveBeenCalledWith({
      left: -400,
      behavior: "smooth",
    });
  });

  it("should scroll right when scroll function is called with 'right' direction", () => {
    const { result } = renderHook(() => useRecipeCarousel());

    const mockScrollBy = vi.fn();
    const mockCarousel = {
      scrollBy: mockScrollBy,
    };

    act(() => {
      result.current.carouselRef.current =
        mockCarousel as unknown as HTMLDivElement;
    });

    act(() => {
      result.current.scroll(ScrollDirection.RIGHT);
    });

    expect(mockScrollBy).toHaveBeenCalledWith({
      left: 400,
      behavior: "smooth",
    });
  });
});
