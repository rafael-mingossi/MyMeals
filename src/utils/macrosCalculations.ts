import {
  Foods,
  OnItemPressFoodNavigation,
  OnItemPressRecipeNavigation,
} from '@domain';

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

const calculateFoodMacros = (
  food: OnItemPressFoodNavigation,
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
  food: OnItemPressRecipeNavigation,
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
};
