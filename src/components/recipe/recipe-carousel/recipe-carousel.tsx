import { useRecipeCarousel } from "@/hooks/use-recipe-carousel/use-recipe-carousel";
import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";
import { useNavigate } from "react-router";
import Subtitle from "../../input/typography/subtitle";
import RecipeCarouselItem from "./components/recipe-carousel-item";
import RecipeCarouselNavigation from "./components/recipe-carousel-navigation";

interface RecipeCarouselProps {
  categoryName: string;
  recipes: IRecipeSearch[];
}

function RecipeCarousel({
  categoryName,
  recipes,
}: Readonly<RecipeCarouselProps>) {
  const navigate = useNavigate();

  const { carouselRef, showLeftArrow, showRightArrow, handleScroll, scroll } =
    useRecipeCarousel();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <Subtitle>{categoryName}</Subtitle>
        <RecipeCarouselNavigation
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          scroll={scroll}
        />
      </div>

      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {recipes.map(function mapRecipes(recipe) {
          return (
            <RecipeCarouselItem
              key={recipe.id}
              recipe={recipe}
              handleRecipeClick={handleRecipeClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecipeCarousel;
