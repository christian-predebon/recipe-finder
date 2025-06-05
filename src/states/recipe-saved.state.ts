import { IRecipeSearch } from "@/services/recipe/entities/recipe-search.entity";
import { atomWithStorage } from "jotai/utils";

interface IRecipeSaved {
  saved: IRecipeSearch[];
}

const initialState: IRecipeSaved = {
  saved: [],
};

const RECIPES_SAVED_KEY = "recipe-saved";

export const RecipeSavedAtom = atomWithStorage<IRecipeSaved>(
  RECIPES_SAVED_KEY,
  initialState
);
