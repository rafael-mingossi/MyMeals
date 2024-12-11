import {useCreateRecipe} from '@domain';
import {
  useAuthCredentials,
  useRecipeItems,
  useRecipeListService,
  useToastService,
} from '@services';
import {macrosCalculations} from '@utils';

import {AddRecipeSchema} from '../tabs/addRecipeSchema';

export function useCreateRecipeForm() {
  const {authCredentials} = useAuthCredentials();
  const user = authCredentials?.user;
  const recipeItems = useRecipeItems();
  const {clearRecipeList} = useRecipeListService();
  const {showToast} = useToastService();
  const {mutate: createRecipe, isPending} = useCreateRecipe({
    onSuccess: () => {
      clearRecipeList();
      showToast({message: 'Recipe was added!', type: 'success'});
    },
    onError: error => {
      showToast({message: error, type: 'error'});
    },
  });

  const handleCreateRecipe = (formData: AddRecipeSchema) => {
    if (!user?.id) {
      return;
    }

    const totals = macrosCalculations.recipeTotals(recipeItems);

    const recipeData = {
      user_id: user.id,
      name: formData.name,
      serving: formData.serving,
      serv_unit: formData.servingUnit,
      t_calories: totals.calories,
      t_carbs: totals.carbs,
      t_fat: totals.fat,
      t_protein: totals.protein,
      t_fibre: totals.fibre,
      t_sodium: totals.sodium,
      items: Array.from(recipeItems.values()).map(item => ({
        food_id: item.food.id,
        quantity: item.quantity,
      })),
    };

    createRecipe(recipeData);
  };

  return {
    handleCreateRecipe,
    isPending,
  };
}
