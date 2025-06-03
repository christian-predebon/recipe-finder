import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./breadcrumbs";

vi.mock("@/hooks/use-breadcrumbs/use-breadcrumbs", () => ({
  default: vi.fn(() => [
    {
      pathname: "/",
      title: "Home",
      isLast: true,
    },
  ]),
}));

describe(Breadcrumbs.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the breadcrumbs", () => {
    render(<Breadcrumbs />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
