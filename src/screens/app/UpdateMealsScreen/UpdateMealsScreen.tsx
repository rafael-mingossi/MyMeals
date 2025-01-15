import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {
  Foods,
  Meal,
  useDeleteMealItem,
  useGetFoodsByIds,
  useGetMealsByUserAndDate,
  useGetRecipesById,
} from '@domain';
import {useAuthCredentials, useCalendar, useToastService} from '@services';

import {
  ActivityIndicator,
  Box,
  Ingredient,
  OptionItem,
  Screen,
  Surface,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';

import {MealLineItem} from '../HomeScreen/components/MealsCalTable.tsx';

export function UpdateMealsScreen({
  route,
}: AppScreenProps<'UpdateMealsScreen'>) {
  const {showToast} = useToastService();
  const {authCredentials} = useAuthCredentials();
  const {dateSelected} = useCalendar();

  const {meals, isLoading} = useGetMealsByUserAndDate(
    authCredentials?.user.id as string,
    dateSelected.dateString,
  );

  const currentMeals = meals.filter(
    meal => meal.mealType === route.params.mealType,
  );

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

  const foodIdsByMealType = extractIdsByMealType(currentMeals, 'foodId');
  const recipeIdsByMealType = extractIdsByMealType(currentMeals, 'recipeId');
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
      showToast({
        message: 'Item deleted successfully',
        type: 'success',
      });
    },
    onError: error => {
      showToast({
        message: error || 'Failed to delete item',
        type: 'error',
      });
      console.error('Failed to delete item:', error);
    },
  });

  // Create a map of foods with their corresponding meal item IDs
  const foodsWithMealItemIds = React.useMemo(() => {
    const allMeals = currentMeals.filter(
      meal => meal.mealType === route.params.mealType,
    );

    return foods.map(food => {
      const mealItem = allMeals
        .flatMap(meal => meal.mealItems || [])
        .find(item => item.foodId === food.id);

      return {
        ...food,
        mealItemId: mealItem?.id,
      };
    });
  }, [foods, currentMeals, route.params.mealType]);
  console.log({foodsWithMealItemIds});

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
          meals={currentMeals}
          showOptions={false}
        />
        <Box borderBottomWidth={1} borderColor={'background'} />
        {isDeleting || loadingRecipes || loadingFoods || isLoading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator />
          </Box>
        ) : foodsWithMealItemIds.length === 0 ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text>No items found</Text>
          </Box>
        ) : (
          <FlatList
            data={foodsWithMealItemIds}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={item => `${item.id}`}
          />
        )}
      </Surface>
    </Screen>
  );
}
