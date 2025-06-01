import { RecipeCategoriesAtom } from "@/states/recipe-categories/recipe-categories.state";
import { useAtomValue } from "jotai";

export function useRecipeCategories() {
  const categories = useAtomValue(RecipeCategoriesAtom);

  return { categories };
}
