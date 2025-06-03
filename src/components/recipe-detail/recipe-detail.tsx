import { useRecipeById } from "@/hooks/use-recipe-by-id/use-recipe-by-id";
import { IRecipe } from "@/services/recipe/entities/recipe.entity";
import { useParams } from "react-router-dom";
import Subtitle from "../input/typography/subtitle";

function RecipeDetailPage() {
  const { id } = useParams();

  const { recipe, isLoading, error } = useRecipeById(id);

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Error loading recipe details</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Recipe not found</p>
      </div>
    );
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`ingredient${i}` as keyof IRecipe];
    const measure = recipe[`measure${i}` as keyof IRecipe];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <img
          src={recipe.thumb}
          alt={recipe.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Subtitle>{recipe.name}</Subtitle>
            <div className="flex items-center gap-2 px-3 py-0.5 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer bg-red-50 text-red-800 border border-red-200 w-fit">
              {recipe.category}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-base font-medium text-gray-700 border-b border-gray-100 pb-2">
              Ingredients
            </h2>
            <ul className="flex flex-col gap-2">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Subtitle>Instructions</Subtitle>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {recipe.instructions}
            </p>
          </div>

          {recipe.youtube && (
            <div className="flex flex-col gap-3">
              <Subtitle>Video Tutorial</Subtitle>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    recipe.youtube
                  )}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
