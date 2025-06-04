import { ROUTES } from "@/consts/routes.const";
import { HEADER_TITLE } from "@/consts/text.const";
import useHeaderMenuState from "@/hooks/use-header-menu-state/use-header-menu-state";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./header";

const navigateSpy = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateSpy,
}));

const mockOpenMenu = vi.fn();
vi.mock("@/hooks/use-header-menu-state/use-header-menu-state", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/header/components/header-actions", () => ({
  default: vi.fn(() => <div>HeaderActions</div>),
}));

vi.mock("@/components/header/components/header-menu-popup", () => ({
  default: vi.fn(() => <div>HeaderMenuPopup</div>),
}));

describe(Header.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useHeaderMenuState).mockReturnValue({
      isMenuOpen: false,
      menuRef: { current: null },
      openMenu: mockOpenMenu,
      closeMenu: vi.fn(),
    });
  });

  it("renders correctly the title", () => {
    render(<Header />);

    const title = screen.getByText(HEADER_TITLE);

    expect(title).toBeInTheDocument();
  });

  it("navigates to home page when clicking the title", () => {
    render(<Header />);

    const title = screen.getByText(HEADER_TITLE);
    fireEvent.click(title);

    expect(navigateSpy).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
