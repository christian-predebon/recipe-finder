import { ROUTES } from "@/consts/routes.const";
import {
  BOOKMARK_BUTTON_TEXT,
  HEADER_TITLE,
  SEARCH_BUTTON_TEXT,
} from "@/consts/text.const";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./header";

const navigateSpy = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateSpy,
}));

const mockOpenMenu = vi.fn();
vi.mock("@/hooks/use-header-menu-state/use-header-menu-state", () => ({
  default: vi.fn(() => ({
    isMenuOpen: false,
    menuRef: { current: null },
    openMenu: mockOpenMenu,
    closeMenu: vi.fn(),
  })),
}));

vi.mock("@/components/header/components/header-actions", () => ({
  default: vi.fn(() => (
    <div>
      <button onClick={mockOpenMenu}>{SEARCH_BUTTON_TEXT}</button>
      <button onClick={() => navigateSpy(ROUTES.FAVORITES)}>
        {BOOKMARK_BUTTON_TEXT}
      </button>
    </div>
  )),
}));

vi.mock("@/components/header/components/header-menu-popup", () => ({
  default: vi.fn(() => (
    <div data-testid="header-menu-popup">
      <button onClick={() => navigateSpy(ROUTES.FAVORITES)}>
        {BOOKMARK_BUTTON_TEXT}
      </button>
    </div>
  )),
}));

describe(Header.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly the title", () => {
    render(<Header />);

    expect(screen.getByText(HEADER_TITLE)).toBeInTheDocument();
  });

  it("navigates to home page when clicking the title", () => {
    render(<Header />);

    const title = screen.getByText(HEADER_TITLE);
    fireEvent.click(title);

    expect(navigateSpy).toHaveBeenCalledWith(ROUTES.HOME);
  });

  it("navigates to favorites page when clicking the favorite button", () => {
    render(<Header />);

    const favoriteButton = screen.getByText(BOOKMARK_BUTTON_TEXT);
    fireEvent.click(favoriteButton);

    expect(navigateSpy).toHaveBeenCalledWith(ROUTES.FAVORITES);
  });

  it("renders the menu button when the screen is small", () => {
    render(<Header />);

    const menuButton = screen.getByText(SEARCH_BUTTON_TEXT);
    fireEvent.click(menuButton);

    expect(mockOpenMenu).toHaveBeenCalled();
  });
});
