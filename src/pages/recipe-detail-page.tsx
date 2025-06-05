import ErrorComponent from "@/components/error/error";
import Button from "@/components/input/button/button";
import Typography from "@/components/input/typography/typography";
import RecipeDetailIngredients from "@/components/recipe-detail/recipe-detail-ingredients";
import RecipeDetailInstructions from "@/components/recipe-detail/recipe-detail-instructions";
import RecipeDetailVideo from "@/components/recipe-detail/recipe-detail-video";
import RecipeDetailSkeleton from "@/components/skeleton/recipe-detail-skeleton";
import useIsSmallScreen from "@/hooks/use-is-small-screen/use-is-small-screen";
import { useRecipeById } from "@/hooks/use-recipe-by-id/use-recipe-by-id";
import { useRecipeSaved } from "@/hooks/use-recipe-saved/use-recipe-saved";
import { useEffect } from "react";
import { Heart } from "react-feather";
import { useParams } from "react-router-dom";

function RecipeDetailPage() {
  const { id } = useParams();
  const { recipe, isLoading, error } = useRecipeById(id);

  const { recipeSaved, addRecipeToSaved, removeRecipeFromSaved } =
    useRecipeSaved();

  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!recipe) {
    return <ErrorComponent message="Ricetta non trovata" />;
  }

  const isRecipeSaved = recipeSaved.saved.some(
    (savedRecipe) => savedRecipe.id === recipe.id
  );

  const handleSaveToFavoritesClick = () => {
    if (isRecipeSaved) {
      removeRecipeFromSaved(recipe);
    } else {
      addRecipeToSaved(recipe);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src={recipe.thumb}
            alt={recipe.name}
            className="w-full h-[400px] object-cover"
          />
          {isSmallScreen && (
            <button
              onClick={handleSaveToFavoritesClick}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Heart
                className={`h-6 w-6 ${
                  isRecipeSaved ? "text-red-dark" : "group-hover:text-red-dark"
                }`}
                fill={isRecipeSaved ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <Typography variant="subtitle">{recipe.name}</Typography>
            {!isSmallScreen && (
              <Button
                onClick={handleSaveToFavoritesClick}
                icon={
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      isRecipeSaved
                        ? "text-red-dark"
                        : "group-hover:text-red-dark"
                    }`}
                    fill={isRecipeSaved ? "currentColor" : "none"}
                  />
                }
                title={
                  isRecipeSaved
                    ? "Rimuovi dai preferiti"
                    : "Salva nei preferiti"
                }
                variant="outlined"
              />
            )}
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
