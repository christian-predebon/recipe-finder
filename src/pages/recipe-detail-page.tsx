import ErrorComponent from "@/components/error/error";
import Subtitle from "@/components/input/typography/subtitle";
import RecipeDetailIngredients from "@/components/recipe-detail/recipe-detail-ingredients";
import RecipeDetailInstructions from "@/components/recipe-detail/recipe-detail-instructions";
import RecipeDetailVideo from "@/components/recipe-detail/recipe-detail-video";
import RecipeDetailSkeleton from "@/components/skeleton/recipe-detail-skeleton";
import { useRecipeById } from "@/hooks/use-recipe-by-id/use-recipe-by-id";
import { useParams } from "react-router-dom";

function RecipeDetailPage() {
  const { id } = useParams();
  const { recipe, isLoading, error } = useRecipeById(id);

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!recipe) {
    return <ErrorComponent message="Ricetta non trovata" />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl overflow-hidden">
        <img
          src={recipe.thumb}
          alt={recipe.name}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-6 space-y-8">
          <div>
            <Subtitle>{recipe.name}</Subtitle>
          </div>

          <RecipeDetailIngredients recipe={recipe} />
          <RecipeDetailInstructions recipeInstructions={recipe.instructions} />

          {recipe.youtube && <RecipeDetailVideo youtubeId={recipe.youtube} />}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
