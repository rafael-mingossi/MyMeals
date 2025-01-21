import {Recipe} from '@domain';

export interface CalculatedRecipeMacros {
  servSize: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
  totalFibre: number;
  totalSodium: number;
}

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

export const calcRecipeMacros = {
  calculateRecipeMacros,
};
