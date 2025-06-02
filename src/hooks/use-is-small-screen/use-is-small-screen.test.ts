import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useIsSmallScreen from "./use-is-small-screen";

describe(useIsSmallScreen.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setScreenWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });

    window.dispatchEvent(new Event("resize"));
  };

  it("should return true when the screen is small", () => {
    setScreenWidth(767);

    const { result } = renderHook(() => useIsSmallScreen());

    expect(result.current).toBe(true);
  });

  it("should return false when the screen is not small", () => {
    setScreenWidth(768);

    const { result } = renderHook(() => useIsSmallScreen());

    expect(result.current).toBe(false);
  });
});
