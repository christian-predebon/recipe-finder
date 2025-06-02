import ArrowButton from "@/components/input/arrow-button/arrow-button";
import { ChevronLeft, ChevronRight } from "react-feather";

interface RecipeCarouselNavigationProps {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scroll: (direction: "left" | "right") => void;
}

function RecipeCarouselNavigation({
  showLeftArrow,
  showRightArrow,
  scroll,
}: Readonly<RecipeCarouselNavigationProps>) {
  return (
    <div className="flex gap-2">
      <ArrowButton onClick={() => scroll("left")} disabled={!showLeftArrow}>
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </ArrowButton>
      <ArrowButton onClick={() => scroll("right")} disabled={!showRightArrow}>
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </ArrowButton>
    </div>
  );
}

export default RecipeCarouselNavigation;
