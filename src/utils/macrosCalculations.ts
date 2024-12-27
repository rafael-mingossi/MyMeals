import {Foods, Meal, Recipe} from '@domain';
import {MealItem} from '@services';

export interface CalculatedMacros {
  servSize: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fibre: number;
  sodium: number;
}

export interface CalculatedRecipeMacros {
  servSize: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
  totalFibre: number;
  totalSodium: number;
}

interface Totals {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  fibre: number;
  sodium: number;
}

interface MealTotals extends Omit<CalculatedRecipeMacros, 'servSize'> {}

interface CaloriesByMeals {
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

const calculateFoodMacros = (
  food: Foods,
  quantity: number,
): CalculatedMacros => {
  const parsedQuantity = parseFloat(quantity.toString()) || 1;

  return {
    servSize: parseFloat((food.servSize * parsedQuantity).toFixed(0)),
    calories: parseFloat((food.calories * parsedQuantity).toFixed(0)),
    protein: parseFloat((food.protein * parsedQuantity).toFixed(0)),
    fat: parseFloat((food.fat * parsedQuantity).toFixed(0)),
    carbs: parseFloat((food.carbs * parsedQuantity).toFixed(0)),
    fibre: parseFloat(((food.fibre || 0) * parsedQuantity).toFixed(0)),
    sodium: parseFloat(((food.sodium || 0) * parsedQuantity).toFixed(0)),
  };
};

const calculateRecipeMacros = (
  food: Recipe,
  quantity: number,
): CalculatedRecipeMacros => {
  const parsedQuantity = parseFloat(quantity.toString()) || 1;

  return {
    servSize: parseFloat((food.servSize * parsedQuantity).toFixed(0)),
    totalCalories: parseFloat((food.totalCalories * parsedQuantity).toFixed(0)),
    totalProtein: parseFloat((food.totalProtein * parsedQuantity).toFixed(0)),
    totalFat: parseFloat((food.totalFat * parsedQuantity).toFixed(0)),
    totalCarbs: parseFloat((food.totalCarbs * parsedQuantity).toFixed(0)),
    totalFibre: parseFloat(
      ((food.totalFibre || 0) * parsedQuantity).toFixed(0),
    ),
    totalSodium: parseFloat(
      ((food.totalSodium || 0) * parsedQuantity).toFixed(0),
    ),
  };
};

const recipeTotals = (items: Map<number, {food: Foods; quantity: number}>) => {
  return Array.from(items.values()).reduce(
    (acc, {food, quantity}) => ({
      weight: (acc.weight || 0) + food.servSize * quantity,
      calories: acc.calories + food.calories * quantity,
      protein: acc.protein + food.protein * quantity,
      fat: acc.fat + food.fat * quantity,
      carbs: acc.carbs + food.carbs * quantity,
      fibre: acc.fibre + (food.fibre || 0) * quantity,
      sodium: acc.sodium + (food.sodium || 0) * quantity,
    }),
    {
      weight: 0,
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fibre: 0,
      sodium: 0,
    },
  );
};

export const macrosCalculations = {
  recipeTotals,
  calculateFoodMacros,
  calculateRecipeMacros,
  calculateTotals,
  calculateMealTotals,
  calculateCaloriesByMealType,
};
