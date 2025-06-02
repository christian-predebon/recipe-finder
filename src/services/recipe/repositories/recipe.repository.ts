import { RecipeDatasource } from "../datasources/recipe.datasource";
import { IRecipeDatasource } from "../datasources/recipe.datasource.interface";
import { IRecipeCategory } from "../entities/recipe-category.entity";
import { IRecipeGroups } from "../entities/recipe-group.entity";
import { IRecipeSearch } from "../entities/recipe-search.entity";
import { IRecipe } from "../entities/recipe.entity";
import { IRecipeRepository } from "./recipe.repository.interface";

export class RecipeRepository implements IRecipeRepository {
  constructor(
    private readonly datasource: IRecipeDatasource = new RecipeDatasource()
  ) {}

  async getRecipesByIngredient(
    recipeIngredient: string
  ): Promise<IRecipeSearch[]> {
    return this.datasource.getRecipesByIngredient(recipeIngredient);
  }

  async getRecipesByCategory(recipeCategory: string): Promise<IRecipeSearch[]> {
    return this.datasource.getRecipesByCategory(recipeCategory);
  }

  async getAllCategories(): Promise<IRecipeCategory[]> {
    return this.datasource.getAllCategories();
  }

  async getRecipeById(recipeId: string): Promise<IRecipe> {
    return this.datasource.getRecipeById(recipeId);
  }

  async getRecipesGroupedByCategory(): Promise<IRecipeGroups> {
    const categories = await this.getAllCategories();

    const groups = await Promise.all(
      categories.map(async (category) => {
        const recipes = await this.getRecipesByCategory(category.name);

        return {
          category: category.name,
          recipes,
        };
      })
    );

    return { groups };
  }
}
