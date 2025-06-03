import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";
import { useNavigate } from "react-router-dom";
import RecipeCarouselItem from "../recipe-carousel/components/recipe-carousel-item";

interface RecipeSearchListProps {
  recipes: IRecipeSearch[];
}

function RecipeSearchList({ recipes }: Readonly<RecipeSearchListProps>) {
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(function mapRecipe(recipe) {
        return (
          <RecipeCarouselItem
            key={recipe.id}
            recipe={recipe}
            handleRecipeClick={handleRecipeClick}
          />
        );
      })}
    </div>
  );
}

export default RecipeSearchList;
