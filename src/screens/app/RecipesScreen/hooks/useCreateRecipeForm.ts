import {useEffect, useMemo} from 'react';

// eslint-disable-next-line import/order
import {
  Recipe,
  useCreateRecipe,
  useGetFoodsByIds,
  useUpdateRecipe,
} from '@domain';

export function useCreateRecipeForm(
  isUpdatingItem = false,
  recipeToUpdate?: Recipe,
) {
  const {authCredentials} = useAuthCredentials();
  const user = authCredentials?.user;
  const recipeItems = useRecipeItems();
  const {clearRecipeList, addFoodToRecipe} = useRecipeListService();
  const {showToast} = useToastService();
  const navigation = useNavigation();

  // Get foodIds for updating
  const foodIds = useMemo(() => {
    if (!isUpdatingItem || !recipeToUpdate?.recipeItems) {
      return [];
    }
    return recipeToUpdate.recipeItems.map(item => item.foodId);
  }, [isUpdatingItem, recipeToUpdate]);

  // Fetch foods data
  const {foods, isLoading: isFoodsLoading} = useGetFoodsByIds(foodIds);

  // Initialize recipe items when updating
  useEffect(() => {
    if (isUpdatingItem && foods.length > 0 && recipeToUpdate?.recipeItems) {
      clearRecipeList();

      recipeToUpdate.recipeItems.forEach(item => {
        const food = foods.find(f => f.id === item.foodId);
        if (food) {
          addFoodToRecipe(food, item.quantity);
        }
      });
    }
  }, [isUpdatingItem, foods, recipeToUpdate, addFoodToRecipe, clearRecipeList]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearRecipeList();
    };
  }, [clearRecipeList]);

  const {mutate: createRecipe, isPending: isCreating} = useCreateRecipe({
    onSuccess: () => {
      clearRecipeList();
      showToast({message: 'Recipe was added!', type: 'success'});
    },
    onError: error => {
      showToast({message: error, type: 'error'});
    },
  });

  const {mutate: updateRecipe, isPending: isUpdating} = useUpdateRecipe({
    onSuccess: () => {
      clearRecipeList();
      showToast({message: 'Recipe was updated!', type: 'success'});
      navigation.navigate('AppTabNavigator', {screen: 'RecipesScreen'});
    },
    onError: () => {
      showToast({message: 'Error to update Recipe', type: 'error'});
    },
  });

  const handleCreateRecipe = (formData: AddRecipeForm) => {
    if (!user?.id) {
      return;
    }

    const totals = macrosCalculations.recipeTotals(recipeItems);

    const recipeItemsList = Array.from(recipeItems.values()).map(item => ({
      food_id: item.food.id,
      quantity: item.quantity,
    }));

    if (isUpdatingItem && recipeToUpdate?.id) {
      updateRecipe({
        id: recipeToUpdate?.id,
        name: formData.name,
        serving: Number(formData.serving),
        serv_unit: formData.servingUnit,
        t_calories: totals.calories,
        t_carbs: totals.carbs,
        t_fat: totals.fat,
        t_protein: totals.protein,
        t_fibre: totals.fibre,
        t_sodium: totals.sodium,
        items: recipeItemsList,
      });
    } else {
      createRecipe({
        user_id: user.id,
        name: formData.name,
        serving: Number(formData.serving),
        serv_unit: formData.servingUnit,
        t_calories: totals.calories,
        t_carbs: totals.carbs,
        t_fat: totals.fat,
        t_protein: totals.protein,
        t_fibre: totals.fibre,
        t_sodium: totals.sodium,
        items: recipeItemsList,
        is_archived: false,
      });
    }
  };

  return {
    handleCreateRecipe,
    isPending: isCreating || isUpdating,
    isLoading: isFoodsLoading,
  };
}

import {useNavigation} from '@react-navigation/native';
import {
  useAuthCredentials,
  useRecipeItems,
  useRecipeListService,
  useToastService,
} from '@services';
import {macrosCalculations} from '@utils';

import {AddRecipeForm} from '../tabs/AddRecipe.tsx';
