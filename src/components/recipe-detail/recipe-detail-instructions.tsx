import Typography from "@/components/input/typography/typography";
import { RECIPE_DETAIL_PAGE_INSTRUCTIONS_TITLE } from "@/consts/text.const";

interface RecipeDetailInstructionsProps {
  recipeInstructions: string;
}

function RecipeDetailInstructions({
  recipeInstructions,
}: RecipeDetailInstructionsProps) {
  return (
    <div className="space-y-4">
      <Typography variant="subtitle">
        {RECIPE_DETAIL_PAGE_INSTRUCTIONS_TITLE}
      </Typography>

      <Typography
        variant="body"
        className="whitespace-pre-line leading-relaxed"
      >
        {recipeInstructions}
      </Typography>
    </div>
  );
}

export default RecipeDetailInstructions;
