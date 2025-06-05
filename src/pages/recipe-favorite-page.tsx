import Typography from "@/components/input/typography/typography";
import RecipeSearchList from "@/components/recipe/recipe-search-list/recipe-search-list";
import {
  FAVORITE_PAGE_DESCRIPTION,
  FAVORITE_PAGE_TITLE,
} from "@/consts/text.const";
import { useRecipeSaved } from "@/hooks/use-recipe-saved/use-recipe-saved";
import { useEffect } from "react";

function FavoritePage() {
  const { recipeSaved } = useRecipeSaved();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isThereNoRecipes = recipeSaved.saved.length === 0;

  return (
    <div className="max-w-7xl mx-auto py-24">
      {isThereNoRecipes && (
        <div className="mb-8">
          <Typography variant="subtitle">{FAVORITE_PAGE_TITLE}</Typography>
          <Typography variant="body">{FAVORITE_PAGE_DESCRIPTION}</Typography>
        </div>
      )}

      {!isThereNoRecipes && (
        <>
          <div className="mb-8">
            <Typography variant="subtitle">{FAVORITE_PAGE_TITLE}</Typography>
            <Typography variant="body">{FAVORITE_PAGE_DESCRIPTION}</Typography>
          </div>
          <RecipeSearchList recipes={recipeSaved.saved} />
        </>
      )}
    </div>
  );
}

export default FavoritePage;
