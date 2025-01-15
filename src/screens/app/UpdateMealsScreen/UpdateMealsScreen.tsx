import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {
  Foods,
  Meal,
  useDeleteMealItem,
  useGetFoodsByIds,
  useGetRecipesById,
} from '@domain';

import {
  ActivityIndicator,
  Box,
  Ingredient,
  OptionItem,
  Screen,
  Surface,
} from '@components';
import {AppScreenProps} from '@routes';

import {MealLineItem} from '../HomeScreen/components/MealsCalTable.tsx';

export function UpdateMealsScreen({
  route,
}: AppScreenProps<'UpdateMealsScreen'>) {
  const extractIdsByMealType = (
    allMeals: Meal[],
    idType: 'foodId' | 'recipeId',
  ) => {
    const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

    const initialAcc = MEAL_TYPES.reduce(
      (acc, mealType) => {
        acc[mealType] = [];
        return acc;
      },
      {} as Record<'breakfast' | 'lunch' | 'dinner' | 'snack', number[]>,
    );

    return allMeals.reduce((acc, meal) => {
      const ids =
        meal.mealItems
          ?.filter(item => typeof item[idType] === 'number')
          .map(item => item[idType] as number) || [];

      if (ids.length > 0) {
        acc[meal.mealType].push(...ids);
      }

      return acc;
    }, initialAcc);
  };

  const foodIdsByMealType = extractIdsByMealType(route.params.meals, 'foodId');
  const recipeIdsByMealType = extractIdsByMealType(
    route.params.meals,
    'recipeId',
  );

  const {recipes, isLoading: loadingRecipes} = useGetRecipesById(
    recipeIdsByMealType[route.params.mealType],
  );
  console.log({recipes});
  const {foods, isLoading: loadingFoods} = useGetFoodsByIds(
    foodIdsByMealType[route.params.mealType],
  );

  // Add the delete meal item mutation
  const {mutate: deleteMealItem, isPending: isDeleting} = useDeleteMealItem({
    onSuccess: () => {
      // Optional: Add success feedback here
      console.log('Item deleted successfully');
    },
    onError: error => {
      // Optional: Add error feedback here
      console.error('Failed to delete item:', error);
    },
  });

  // Create a map of foods with their corresponding meal item IDs
  const foodsWithMealItemIds = React.useMemo(() => {
    const currentMeals = route.params.meals.filter(
      meal => meal.mealType === route.params.mealType,
    );

    return foods.map(food => {
      const mealItem = currentMeals
        .flatMap(meal => meal.mealItems || [])
        .find(item => item.foodId === food.id);

      return {
        ...food,
        mealItemId: mealItem?.id,
      };
    });
  }, [foods, route.params.meals, route.params.mealType]);

  const foodOptions = (food: Foods & {mealItemId?: number}): OptionItem[] => {
    return [
      {
        label: 'Delete',
        onPress: () => {
          if (food.mealItemId) {
            deleteMealItem(food.mealItemId);
          }
        },
      },
    ];
  };

  function renderItem({
    item,
  }: ListRenderItemInfo<Foods & {mealItemId?: number}>) {
    return (
      <Ingredient<Foods & {mealItemId?: number}>
        item={item}
        isEditing={true}
        options={foodOptions(item)}
      />
    );
  }

  return (
    <Screen canGoBack>
      <Surface marginTop={'s10'}>
        <MealLineItem
          type={route.params.mealType}
          meals={route.params.meals}
          showOptions={false}
        />
        <Box borderBottomWidth={1} borderColor={'background'} />
        {loadingFoods || loadingRecipes || isDeleting ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator />
          </Box>
        ) : (
          <FlatList
            data={foodsWithMealItemIds}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        )}
      </Surface>
    </Screen>
  );
}
