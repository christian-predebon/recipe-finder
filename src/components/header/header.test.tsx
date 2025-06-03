import { ROUTES } from "@/consts/routes.const";
import { BOOKMARK_BUTTON_TEXT, HEADER_TITLE } from "@/consts/text.const";
import useIsSmallScreen from "@/hooks/use-is-small-screen/use-is-small-screen";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./header";

const navigateSpy = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => navigateSpy,
}));

vi.mock("react-feather", () => ({
  Heart: () => <div>Heart</div>,
  Menu: () => <div>Menu</div>,
  Search: () => <div>Search</div>,
}));

vi.mock("@/hooks/use-is-small-screen/use-is-small-screen", () => ({
  default: vi.fn(() => false),
}));

const mockUseIsSmallScreen = vi.mocked(useIsSmallScreen);

const mockOpenMenu = vi.fn();
vi.mock("@/hooks/use-header-menu-state/use-header-menu-state", () => ({
  default: vi.fn(() => ({
    isMenuOpen: false,
    menuRef: { current: null },
    openMenu: mockOpenMenu,
    closeMenu: vi.fn(),
  })),
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
    mockUseIsSmallScreen.mockReturnValue(true);

    render(<Header />);

    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});
