import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Foods, Meal, useGetFoodsByIds, useGetRecipesById} from '@domain';

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
  console.log(recipes);
  const {foods, isLoading: loadingFoods} = useGetFoodsByIds(
    foodIdsByMealType[route.params.mealType],
  );

  const foodOptions = (food: Foods): OptionItem[] => {
    return [
      {
        label: 'Delete',
        onPress: () => {
          console.log(food);
        },
      },
    ];
  };

  function renderItem({item}: ListRenderItemInfo<Foods>) {
    return (
      <Ingredient<Foods>
        item={item}
        isEditing={true}
        options={foodOptions(item)}
      />
    );
  }

  if (loadingFoods || loadingRecipes) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
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
        <FlatList data={foods} renderItem={renderItem} scrollEnabled={false} />
      </Surface>
    </Screen>
  );
}
