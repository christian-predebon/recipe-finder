import RecipeCarouselArrowButton from "@/components/recipe/recipe-carousel/components/recipe-carousel-arrow-button";
import { ScrollDirection } from "@/hooks/use-recipe-carousel/use-recipe-carousel";
import { ChevronLeft, ChevronRight } from "react-feather";

interface RecipeCarouselNavigationProps {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scroll: (direction: ScrollDirection) => void;
}

function RecipeCarouselNavigation({
  showLeftArrow,
  showRightArrow,
  scroll,
}: Readonly<RecipeCarouselNavigationProps>) {
  return (
    <div className="flex gap-2">
      <RecipeCarouselArrowButton
        onClick={() => scroll(ScrollDirection.LEFT)}
        disabled={!showLeftArrow}
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </RecipeCarouselArrowButton>
      <RecipeCarouselArrowButton
        onClick={() => scroll(ScrollDirection.RIGHT)}
        disabled={!showRightArrow}
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </RecipeCarouselArrowButton>
    </div>
  );
}

export default RecipeCarouselNavigation;
