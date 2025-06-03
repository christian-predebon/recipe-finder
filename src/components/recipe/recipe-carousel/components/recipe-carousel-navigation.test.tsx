import { fireEvent, render, screen } from "@testing-library/react";
import RecipeCarouselNavigation from "./recipe-carousel-navigation";

const mockScroll = vi.fn();

vi.mock("react-feather", () => ({
  ChevronLeft: () => <div>Left</div>,
  ChevronRight: () => <div>Right</div>,
}));

describe(RecipeCarouselNavigation.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the left and right arrows when showLeftArrow and showRightArrow are true", () => {
    render(
      <RecipeCarouselNavigation
        showLeftArrow={true}
        showRightArrow={true}
        scroll={mockScroll}
      />
    );

    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("should call scroll when the left arrow is clicked", () => {
    render(
      <RecipeCarouselNavigation
        showLeftArrow={true}
        showRightArrow={true}
        scroll={mockScroll}
      />
    );

    const leftArrow = screen.getByText("Left");
    fireEvent.click(leftArrow);

    expect(mockScroll).toHaveBeenCalledWith("left");
  });
});
