import { BOOKMARK_BUTTON_TEXT, SEARCH_BUTTON_TEXT } from "@/consts/text.const";
import useIsSmallScreen from "@/hooks/use-is-small-screen/use-is-small-screen";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeaderActions from "./header-actions";

vi.mock("react-feather", () => ({
  Menu: vi.fn(),
  Search: vi.fn(),
  Heart: vi.fn(),
}));

vi.mock("@/hooks/use-is-small-screen/use-is-small-screen", () => ({
  default: vi.fn(),
}));

describe(HeaderActions.name, () => {
  const mockOnClickFavorites = vi.fn();
  const mockOnClickSearch = vi.fn();
  const mockOnOpenMenu = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders menu button on small screens", () => {
    vi.mocked(useIsSmallScreen).mockReturnValue(true);

    render(
      <HeaderActions
        onClickFavorites={mockOnClickFavorites}
        onClickSearch={mockOnClickSearch}
        onOpenMenu={mockOnOpenMenu}
      />
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(mockOnOpenMenu).toHaveBeenCalledTimes(1);
  });

  it("renders search and favorites buttons on regular screens", () => {
    vi.mocked(useIsSmallScreen).mockReturnValue(false);

    render(
      <HeaderActions
        onClickFavorites={mockOnClickFavorites}
        onClickSearch={mockOnClickSearch}
        onOpenMenu={mockOnOpenMenu}
      />
    );

    const searchButton = screen.getByText(SEARCH_BUTTON_TEXT);
    const favoritesButton = screen.getByText(BOOKMARK_BUTTON_TEXT);

    expect(searchButton).toBeInTheDocument();
    expect(favoritesButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(mockOnClickSearch).toHaveBeenCalledTimes(1);

    fireEvent.click(favoritesButton);
    expect(mockOnClickFavorites).toHaveBeenCalledTimes(1);
  });
});
