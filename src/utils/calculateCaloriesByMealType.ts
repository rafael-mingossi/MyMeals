import {Meal} from '@domain';

export interface CaloriesByMeals {
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
}

function calculateCaloriesByMealType(meals: Meal[]): CaloriesByMeals {
  return meals.reduce(
    (acc, meal) => {
      acc[meal.mealType] += meal.totalCalories;
      return acc;
    },
    {breakfast: 0, lunch: 0, dinner: 0, snack: 0},
  );
}

export const calcCalsByMealType = {
  calculateCaloriesByMealType,
};
