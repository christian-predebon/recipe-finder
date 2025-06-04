import { renderHook } from "@testing-library/react";
import { useMatches } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useBreadcrumbs, { BreadcrumbItem } from "./use-breadcrumbs";

vi.mock("react-router-dom", () => ({
  useMatches: vi.fn(),
}));

describe("useBreadcrumbs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty array if no matches have breadcrumb handle", () => {
    vi.mocked(useMatches).mockReturnValue([
      { pathname: "/home", handle: {} },
      { pathname: "/home/settings" },
    ] as unknown as ReturnType<typeof useMatches>);

    const { result } = renderHook(() => useBreadcrumbs());
    expect(result.current).toEqual([]);
  });

  it("returns breadcrumbs with correct titles and isLast flag", () => {
    vi.mocked(useMatches).mockReturnValue([
      {
        pathname: "/home",
        handle: { breadcrumb: "Home" },
      },
      {
        pathname: "/home/settings",
        handle: { breadcrumb: "Settings" },
      },
    ] as unknown as ReturnType<typeof useMatches>);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toEqual<BreadcrumbItem[]>([
      {
        pathname: "/home",
        title: "Home",
        isLast: false,
      },
      {
        pathname: "/home/settings",
        title: "Settings",
        isLast: true,
      },
    ]);
  });
});
