import { BOOKMARK_BUTTON_TEXT, SEARCH_BUTTON_TEXT } from "@/consts/text.const";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeaderMenuPopup from "./header-menu-popup";

vi.mock("react-feather", () => ({
  Search: vi.fn(() => <div data-testid="search-icon" />),
  Heart: vi.fn(() => <div data-testid="heart-icon" />),
}));

describe(HeaderMenuPopup.name, () => {
  const mockOnClickFavorites = vi.fn();
  const mockOnClickSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both search and favorites buttons with correct text", () => {
    render(
      <HeaderMenuPopup
        onClickFavorites={mockOnClickFavorites}
        onClickSearch={mockOnClickSearch}
      />
    );

    const searchButton = screen.getByText(SEARCH_BUTTON_TEXT);
    const favoritesButton = screen.getByText(BOOKMARK_BUTTON_TEXT);

    expect(searchButton).toBeInTheDocument();
    expect(favoritesButton).toBeInTheDocument();
  });

  it("renders icons for both buttons", () => {
    render(
      <HeaderMenuPopup
        onClickFavorites={mockOnClickFavorites}
        onClickSearch={mockOnClickSearch}
      />
    );

    const searchIcon = screen.getByTestId("search-icon");
    const favoritesIcon = screen.getByTestId("heart-icon");

    expect(searchIcon).toBeInTheDocument();
    expect(favoritesIcon).toBeInTheDocument();
  });

  it("calls onClickSearch when search button is clicked", () => {
    render(
      <HeaderMenuPopup
        onClickFavorites={mockOnClickFavorites}
        onClickSearch={mockOnClickSearch}
      />
    );

    const searchButton = screen.getByText(SEARCH_BUTTON_TEXT);
    fireEvent.click(searchButton);

    expect(mockOnClickSearch).toHaveBeenCalledTimes(1);
  });

  it("calls onClickFavorites when favorites button is clicked", () => {
    render(
      <HeaderMenuPopup
        onClickFavorites={mockOnClickFavorites}
        onClickSearch={mockOnClickSearch}
      />
    );

    const favoritesButton = screen.getByText(BOOKMARK_BUTTON_TEXT);
    fireEvent.click(favoritesButton);

    expect(mockOnClickFavorites).toHaveBeenCalledTimes(1);
  });
});
