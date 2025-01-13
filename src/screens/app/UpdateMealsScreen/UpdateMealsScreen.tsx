import React from 'react';

import {Meal, useGetFoodsByIds, useGetRecipesById} from '@domain';

import {ActivityIndicator, Screen, Surface} from '@components';
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
  const {foods, isLoading: loadingFoods} = useGetFoodsByIds(
    foodIdsByMealType[route.params.mealType],
  );
  console.log({recipes});
  console.log({foods});

  if (loadingFoods || loadingRecipes) {
    return <ActivityIndicator />;
  }

  return (
    <Screen canGoBack>
      <Surface marginTop={'s10'}>
        <MealLineItem
          type={route.params.mealType}
          meals={route.params.meals}
          showOptions={false}
        />
      </Surface>
    </Screen>
  );
}
