import { IRecipeSearch } from "./recipe-search.entity";

export interface IRecipeGroup {
  category: string;
  recipes: IRecipeSearch[];
}

export interface IRecipeGroups {
  groups: IRecipeGroup[];
}
