import {RecipesAPI, RecipeItemsAPI, Recipe, RecipeItem} from './recipesTypes';

function toRecipeItem(recipeItemAPI: RecipeItemsAPI): RecipeItem {
  return {
    id: recipeItemAPI.id,
    createdAt: new Date(recipeItemAPI.created_at),
    recipeId: recipeItemAPI.recipe_id,
    foodId: recipeItemAPI.food_id,
    quantity: recipeItemAPI.quantity,
  };
}

function toRecipe(
  recipeAPI: RecipesAPI,
  recipeItemsAPI?: RecipeItemsAPI[],
): Recipe {
  return {
    id: recipeAPI.id,
    createdAt: new Date(recipeAPI.created_at),
    userId: recipeAPI.user_id,
    label: recipeAPI.name,
    totalCalories: recipeAPI.t_calories,
    totalCarbs: recipeAPI.t_carbs,
    totalFat: recipeAPI.t_fat,
    totalProtein: recipeAPI.t_protein,
    totalFibre: recipeAPI.t_fibre,
    totalSodium: recipeAPI.t_sodium,
    servSize: recipeAPI.serving,
    servUnit: recipeAPI.serv_unit,
    image: recipeAPI.img,
    recipeItems: recipeItemsAPI?.map(toRecipeItem),
  };
}

function toRecipesList(recipesAPI: RecipesAPI[]): Recipe[] {
  return recipesAPI.map(recipe => toRecipe(recipe));
}

export const recipesAdapter = {
  toRecipe,
  toRecipesList,
  toRecipeItem,
};
