import {create} from 'zustand';

import {RecipeListTypes} from './recipeListTypes.ts';

const useRecipeListStore = create<RecipeListTypes>((set, get) => ({
  recipeList: [],
  addFoodToRecipe: food => {
    const recipeList = get().recipeList;
    const foodExistInList = recipeList.find(item => item.id === food.id);

    if (!foodExistInList) {
      const updatedRecipeList = [...recipeList, food];
      set({recipeList: updatedRecipeList});
    }
  },
  removeFoodFromRecipe: foodId => {
    const foodList = get().recipeList;
    const updatedRecipeList = foodList.filter(food => food.id !== foodId);
    set({recipeList: updatedRecipeList});
  },
  clearRecipeList: () => {
    set({recipeList: []});
  },
}));

export function useRecipeList(): RecipeListTypes['recipeList'] {
  return useRecipeListStore(state => state.recipeList);
}

export function useRecipeListService(): Omit<RecipeListTypes, 'recipeList'> {
  const addFoodToRecipe = useRecipeListStore(state => state.addFoodToRecipe);
  const removeFoodFromRecipe = useRecipeListStore(
    state => state.removeFoodFromRecipe,
  );
  const clearRecipeList = useRecipeListStore(state => state.clearRecipeList);

  return {
    addFoodToRecipe,
    removeFoodFromRecipe,
    clearRecipeList,
  };
}
