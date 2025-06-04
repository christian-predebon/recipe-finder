import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Layout from "./layout";

vi.mock("@/components/header/header", () => ({
  default: vi.fn(() => <div>Header</div>),
}));

vi.mock("@/components/breadcrumbs/breadcrumbs", () => ({
  default: vi.fn(() => <div>Breadcrumbs</div>),
}));

vi.mock("react-router-dom", () => ({
  Outlet: () => <div>Outlet</div>,
}));

describe(Layout.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly the children", () => {
    render(<Layout />);

    const header = screen.getByText("Header");
    
    expect(header).toBeInTheDocument();
  });

  it("renders correctly the breadcrumbs", () => {
    render(<Layout />);

    const breadcrumbs = screen.getByText("Breadcrumbs");

    expect(breadcrumbs).toBeInTheDocument();
  });

  it("renders correctly the outlet", () => {
    render(<Layout />);

    const outlet = screen.getByText("Outlet");

    expect(outlet).toBeInTheDocument();
  });
});
