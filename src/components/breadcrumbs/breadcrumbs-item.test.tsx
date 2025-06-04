import { BreadcrumbItem } from "@/hooks/use-breadcrumbs/use-breadcrumbs";
import { render, screen } from "@testing-library/react";
import BreadcrumbsItem from "./breadcrumbs-item";

vi.mock("react-router-dom", () => ({
  Link: () => <>Link</>,
}));

const breadcrumb: BreadcrumbItem = {
  pathname: "/about",
  title: "About",
  isLast: false,
};

describe(BreadcrumbsItem.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when the breadcrumb is the last", () => {
    it("should render correctly the last breadcrumb", () => {
      render(<BreadcrumbsItem breadcrumb={{ ...breadcrumb, isLast: true }} />);

      const breadcrumbText = screen.getByText("About");
      const link = screen.queryByText("Link");

      expect(breadcrumbText).toBeInTheDocument();
      expect(link).not.toBeInTheDocument();
    });
  });

  describe("when the breadcrumb is NOT the last", () => {
    it("should render correctly the first breadcrumb", () => {
      render(<BreadcrumbsItem breadcrumb={breadcrumb} />);

      const divider = screen.getByText("/");
      const link = screen.getByText("Link");

      expect(divider).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });
  });
});
