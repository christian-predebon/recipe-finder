import { RECIPE_DETAIL_PAGE_INSTRUCTIONS_TITLE } from "@/consts/text.const";
import Subtitle from "@/components/input/typography/subtitle";

interface RecipeDetailInstructionsProps {
  recipeInstructions: string;
}

function RecipeDetailInstructions({
  recipeInstructions,
}: RecipeDetailInstructionsProps) {
  return (
    <div className="space-y-4">
      <Subtitle>{RECIPE_DETAIL_PAGE_INSTRUCTIONS_TITLE}</Subtitle>

      <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
        {recipeInstructions}
      </p>
    </div>
  );
}

export default RecipeDetailInstructions;
