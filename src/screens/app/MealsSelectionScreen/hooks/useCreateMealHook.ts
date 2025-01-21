import {useCallback} from 'react';

import {MealsTypes, useCreateMeal} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {
  useAuthCredentials,
  useCalendar,
  useMealItems,
  useToastService,
} from '@services';
import {calculateMealItemTotals} from '@utils';
import {SheetManager} from 'react-native-actions-sheet';

export function useCreateMealHook(mealType: MealsTypes) {
  const {clearMealItems, getMealItems} = useMealItems();
  const {dateSelected} = useCalendar();
  const navigation = useNavigation();
  const {showToast} = useToastService();
  const {authCredentials} = useAuthCredentials();
  const {mutate: createMeal, isPending} = useCreateMeal({
    onSuccess: () => {
      SheetManager.hide('bs-cart');
      clearMealItems();
      showToast({
        message: `${mealType.toUpperCase()} was added!`,
        type: 'success',
      });
      navigation.navigate('AppTabNavigator', {screen: 'HomeScreen'});
    },
    onError: error => {
      showToast({message: error, type: 'error'});
    },
  });

  const handleCreateMeal = useCallback(() => {
    const selectedItems = getMealItems();
    const totals = calculateMealItemTotals.calculateTotals(selectedItems);

    if (!authCredentials) {
      return;
    }

    const mealItemsProps = selectedItems.map(item => ({
      foodId: item.type === 'food' ? item.id : undefined,
      foodQuantity: item.type === 'food' ? item.quantity : undefined,
      recipeId: item.type === 'recipe' ? item.id : undefined,
      recipeQuantity: item.type === 'recipe' ? item.quantity : undefined,
    }));

    createMeal({
      user_id: authCredentials?.user.id,
      meal_type: mealType,
      date_added: dateSelected.dateString,
      t_calories: totals.calories,
      t_carbs: totals.carbs,
      t_fat: totals.fat,
      t_protein: totals.protein,
      t_fibre: totals.fibre,
      t_sodium: totals.sodium,
      items: mealItemsProps,
    });
  }, [
    getMealItems,
    authCredentials,
    createMeal,
    mealType,
    dateSelected.dateString,
  ]);

  return {
    handleCreateMeal,
    isPending,
  };
}
