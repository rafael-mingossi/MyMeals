import {Meal} from '@domain';

import {CalculatedRecipeMacros} from './calculateRecipeMacros.ts';

interface MealTotals extends Omit<CalculatedRecipeMacros, 'servSize'> {}

function calculateMealTotals(meal: Meal[]): MealTotals {
  return meal.reduce(
    (acc, curr) => {
      return {
        totalCalories: parseFloat(
          (acc.totalCalories + curr.totalCalories).toFixed(0),
        ),
        totalCarbs: parseFloat((acc.totalCarbs + curr.totalCarbs).toFixed(0)),
        totalFat: parseFloat((acc.totalFat + curr.totalFat).toFixed(0)),
        totalFibre: parseFloat((acc.totalFibre + curr.totalFibre).toFixed(0)),
        totalProtein: parseFloat(
          (acc.totalProtein + curr.totalProtein).toFixed(0),
        ),
        totalSodium: parseFloat(
          (acc.totalSodium + curr.totalSodium).toFixed(0),
        ),
      };
    },
    {
      totalCalories: 0,
      totalFat: 0,
      totalFibre: 0,
      totalSodium: 0,
      totalProtein: 0,
      totalCarbs: 0,
    },
  );
}

export const calcMealTotals = {
  calculateMealTotals,
};
