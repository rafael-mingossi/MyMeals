import {Foods, Recipe} from '@domain';
import {MealItem} from '@services';

interface Totals {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  fibre: number;
  sodium: number;
}

function calculateTotals(items: MealItem[]): Totals {
  return items.reduce(
    (acc, {item, quantity, type}) => {
      const multiplier = quantity;

      if (type === 'food') {
        const food = item as Foods;
        return {
          calories: acc.calories + (food.calories || 0) * multiplier,
          carbs: acc.carbs + (food.carbs || 0) * multiplier,
          fat: acc.fat + (food.fat || 0) * multiplier,
          protein: acc.protein + (food.protein || 0) * multiplier,
          fibre: acc.fibre + (food.fibre || 0) * multiplier,
          sodium: acc.sodium + (food.sodium || 0) * multiplier,
        };
      } else {
        const recipe = item as Recipe;
        return {
          calories: acc.calories + (recipe.totalCalories || 0) * multiplier,
          carbs: acc.carbs + (recipe.totalCarbs || 0) * multiplier,
          fat: acc.fat + (recipe.totalFat || 0) * multiplier,
          protein: acc.protein + (recipe.totalProtein || 0) * multiplier,
          fibre: acc.fibre + (recipe.totalFibre || 0) * multiplier,
          sodium: acc.sodium + (recipe.totalSodium || 0) * multiplier,
        };
      }
    },
    {calories: 0, carbs: 0, fat: 0, protein: 0, fibre: 0, sodium: 0},
  );
}

export const calculateMealItemTotals = {
  calculateTotals,
};
