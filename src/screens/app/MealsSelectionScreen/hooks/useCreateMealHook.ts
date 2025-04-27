import {useCallback} from 'react';

import {MealsTypes, useCreateMeal} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {
  useAuthCredentials,
  useCalendar,
  useMealItems,
  useToastService,
} from '@services';
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

    if (!authCredentials) {
      return;
    }

    const mealItemsProps = selectedItems.map(item => {
      return item.type === 'food'
        ? {
            food_item: {
              food_id: item.id,
              quantity: item.quantity,
            },
          }
        : {
            recipe_item: {
              recipe_id: item.id,
              quantity: item.quantity,
            },
          };
    });

    createMeal({
      meal_type: mealType,
      date_added: dateSelected.dateString,
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
