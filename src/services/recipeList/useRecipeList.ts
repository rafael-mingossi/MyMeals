import {create} from 'zustand';

import {RecipeListTypes} from './recipeListTypes.ts';

const useRecipeListStore = create<RecipeListTypes>(set => ({
  recipeItems: new Map(),

  addFoodToRecipe: (food, quantity) => {
    set(state => {
      const newItems = new Map(state.recipeItems);
      newItems.set(food.id, {food, quantity});
      return {recipeItems: newItems};
    });
  },

  updateIngredient: (foodId, quantity) => {
    set(state => {
      const newItems = new Map(state.recipeItems);
      const item = newItems.get(foodId);
      if (item) {
        newItems.set(foodId, {...item, quantity});
      }
      return {recipeItems: newItems};
    });
  },

  removeFoodFromRecipe: foodId => {
    set(state => {
      const newItems = new Map(state.recipeItems);
      newItems.delete(foodId);
      return {recipeItems: newItems};
    });
  },

  clearRecipeList: () => {
    set({recipeItems: new Map()});
  },
}));

export function useRecipeItems() {
  return useRecipeListStore(state => state.recipeItems);
}

export function useRecipeListService() {
  const addFoodToRecipe = useRecipeListStore(state => state.addFoodToRecipe);
  const updateIngredient = useRecipeListStore(state => state.updateIngredient);
  const removeFoodFromRecipe = useRecipeListStore(
    state => state.removeFoodFromRecipe,
  );
  const clearRecipeList = useRecipeListStore(state => state.clearRecipeList);

  return {
    addFoodToRecipe,
    updateIngredient,
    removeFoodFromRecipe,
    clearRecipeList,
  };
}
