import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {
  Foods,
  Meal,
  Recipe,
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

type CombinedItem = (Foods | Recipe) & {
  mealItemId?: number;
  quantity?: number;
};

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
  const {recipes} = useGetRecipesById(
    recipeIdsByMealType[route.params.mealType],
  );
  const {foods} = useGetFoodsByIds(foodIdsByMealType[route.params.mealType]);

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

  // Combine foods and recipes with their meal item information
  const combinedItems = React.useMemo(() => {
    const allMeals = currentMeals.filter(
      meal => meal.mealType === route.params.mealType,
    );

    // Process foods
    const foodItems = foods.map(food => {
      const mealItem = allMeals
        .flatMap(meal => meal.mealItems || [])
        .find(item => item.foodId === food.id);

      return {
        ...food,
        mealItemId: mealItem?.id,
        quantity: mealItem?.foodQuantity,
        type: 'food' as const,
      };
    });

    // Process recipes
    const recipeItems = recipes.map(recipe => {
      const mealItem = allMeals
        .flatMap(meal => meal.mealItems || [])
        .find(item => item.recipeId === recipe.id);

      return {
        ...recipe,
        mealItemId: mealItem?.id,
        quantity: mealItem?.recipeQuantity,
        type: 'recipe' as const,
      };
    });

    // Combine and sort by meal item ID to maintain order
    return [...foodItems, ...recipeItems].sort((a, b) => {
      if (!a.mealItemId || !b.mealItemId) {
        return 0;
      }
      return a.mealItemId - b.mealItemId;
    });
  }, [foods, recipes, currentMeals, route.params.mealType]);

  const getItemOptions = (item: CombinedItem): OptionItem[] => {
    return [
      {
        label: 'Delete',
        onPress: () => {
          if (item.mealItemId) {
            deleteMealItem(item.mealItemId);
          }
        },
      },
    ];
  };

  function renderItem({item}: ListRenderItemInfo<CombinedItem>) {
    return (
      <Ingredient<CombinedItem>
        item={item}
        isEditing={true}
        options={getItemOptions(item)}
        quantity={item.quantity}
      />
    );
  }

  function renderEmptyList() {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>No items found</Text>
      </Box>
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
        {isDeleting || isLoading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator />
          </Box>
        ) : (
          <FlatList
            data={combinedItems}
            renderItem={renderItem}
            scrollEnabled={false}
            ListEmptyComponent={renderEmptyList}
            keyExtractor={item => `${item.type}-${item.id}`}
          />
        )}
      </Surface>
    </Screen>
  );
}
