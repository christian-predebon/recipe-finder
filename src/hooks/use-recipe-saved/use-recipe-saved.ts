import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";
import { RecipeSavedAtom } from "@/states/recipe-saved.state";
import { useAtom } from "jotai";

export function useRecipeSaved() {
  const [recipeSaved, setRecipeSaved] = useAtom(RecipeSavedAtom);

  return {
    recipeSaved,
    setRecipeSaved,
    addRecipeToSaved,
    removeRecipeFromSaved,
  };

  function addRecipeToSaved(recipe: IRecipeSearch) {
    setRecipeSaved((prev) => ({
      ...prev,
      saved: [...prev.saved, recipe],
    }));
  }

  function removeRecipeFromSaved(recipe: IRecipeSearch) {
    setRecipeSaved((prev) => ({
      ...prev,
      saved: prev.saved.filter((savedRecipe) => savedRecipe.id !== recipe.id),
    }));
  }
}
