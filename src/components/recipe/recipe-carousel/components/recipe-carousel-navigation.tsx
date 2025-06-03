import RecipeCarouselArrowButton from "@/components/recipe/recipe-carousel/components/recipe-carousel-arrow-button";
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
      <RecipeCarouselArrowButton
        onClick={() => scroll("left")}
        disabled={!showLeftArrow}
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </RecipeCarouselArrowButton>
      <RecipeCarouselArrowButton
        onClick={() => scroll("right")}
        disabled={!showRightArrow}
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </RecipeCarouselArrowButton>
    </div>
  );
}

export default RecipeCarouselNavigation;
