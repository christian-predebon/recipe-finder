import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Layout, { LAYOUT_TITLE } from "./layout";

const navigateSpy = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => navigateSpy,
  Outlet: () => <div>Outlet</div>,
}));

vi.mock("react-feather", () => ({
  Bookmark: () => <div>Bookmark</div>,
}));

describe(Layout.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly the title", () => {
    render(<Layout />);

    expect(screen.getByText(LAYOUT_TITLE)).toBeInTheDocument();
  });

  it("navigates to favorites page when clicking the favorite button", () => {
    render(<Layout />);

    const favoriteButton = screen.getAllByRole("button")[0];
    fireEvent.click(favoriteButton);

    expect(navigateSpy).toHaveBeenCalledWith("/favorites");
  });
});
