import { RecipeDatasource } from "../datasources/recipe.datasource";
import { IRecipeDatasource } from "../datasources/recipe.datasource.interface";
import { IRecipeCategory } from "../entities/recipe-category.entity";
import { IRecipeGroups } from "../entities/recipe-group.entity";
import { IRecipeSearch } from "../entities/recipe-search.entity";
import { IRecipe, IRecipeIngredient } from "../entities/recipe.entity";
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

  async getRecipesByName(recipeName: string): Promise<IRecipeSearch[]> {
    return this.datasource.getRecipesByName(recipeName);
  }

  async getRecipesByCategory(recipeCategory: string): Promise<IRecipeSearch[]> {
    return this.datasource.getRecipesByCategory(recipeCategory);
  }

  async getAllCategories(): Promise<IRecipeCategory[]> {
    return this.datasource.getAllCategories();
  }

  async getRecipeById(recipeId: string): Promise<IRecipe> {
    const recipe = await this.datasource.getRecipeById(recipeId);
    return {
      ...recipe,
      ingredients: this.normalizeIngredients(recipe),
    };
  }

  async getRecipesGroupedByCategory(): Promise<IRecipeGroups> {
    const categories = await this.getAllCategories();

    const groups = await Promise.all(
      categories.map(async (category) => {
        const recipes = await this.getRecipesByCategory(category.name);

        const categoryName = category.name;
        return {
          category: categoryName,
          recipes,
        };
      })
    );

    return { groups };
  }

  private normalizeIngredients(recipe: IRecipe): IRecipeIngredient[] {
    const MAX_INGREDIENTS = 20;

    const ingredients = Array.from({ length: MAX_INGREDIENTS }, (_, index) => {
      const ingredientIndex = index + 1;
      const ingredient =
        recipe[`ingredient${ingredientIndex}` as keyof IRecipe];
      const measure = recipe[`measure${ingredientIndex}` as keyof IRecipe];

      if (this.isValidIngredient(ingredient)) {
        return { ingredient, measure } as IRecipeIngredient;
      }
      return null;
    });

    const nonNullIngredients = ingredients.filter(
      (ingredient) => ingredient !== null
    );

    return nonNullIngredients;
  }

  private isValidIngredient(ingredient: unknown): ingredient is string {
    return typeof ingredient === "string" && ingredient.trim().length > 0;
  }
}
