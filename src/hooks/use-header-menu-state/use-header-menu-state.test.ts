import { act, renderHook } from "@testing-library/react";
import useHeaderMenuState from "./use-header-menu-state";

describe(useHeaderMenuState.name, () => {
  it("should initialize with menu closed", () => {
    const { result } = renderHook(() => useHeaderMenuState());

    expect(result.current.isMenuOpen).toBe(false);
    expect(result.current.menuRef).toBeDefined();
    expect(typeof result.current.openMenu).toBe("function");
    expect(typeof result.current.closeMenu).toBe("function");
  });

  it("should open the menu when openMenu is called", () => {
    const { result } = renderHook(() => useHeaderMenuState());

    act(() => {
      result.current.openMenu();
    });

    expect(result.current.isMenuOpen).toBe(true);
  });

  it("should close the menu when closeMenu is called", () => {
    const { result } = renderHook(() => useHeaderMenuState());

    act(() => {
      result.current.openMenu();
    });
    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.closeMenu();
    });
    expect(result.current.isMenuOpen).toBe(false);
  });

  it("should maintain menu state between renders", () => {
    const { result, rerender } = renderHook(() => useHeaderMenuState());

    act(() => {
      result.current.openMenu();
    });

    rerender();
    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.closeMenu();
    });

    rerender();
    expect(result.current.isMenuOpen).toBe(false);
  });
});
