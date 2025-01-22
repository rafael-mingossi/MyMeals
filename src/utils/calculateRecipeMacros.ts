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
  recipe: Recipe,
  quantity: number,
): CalculatedRecipeMacros => {
  const parsedQuantity = parseFloat(quantity.toString()) || 1;

  return {
    servSize: parseFloat((recipe.servSize * parsedQuantity).toFixed(0)),
    totalCalories: parseFloat(
      (recipe.totalCalories * parsedQuantity).toFixed(0),
    ),
    totalProtein: parseFloat((recipe.totalProtein * parsedQuantity).toFixed(0)),
    totalFat: parseFloat((recipe.totalFat * parsedQuantity).toFixed(0)),
    totalCarbs: parseFloat((recipe.totalCarbs * parsedQuantity).toFixed(0)),
    totalFibre: parseFloat(
      ((recipe.totalFibre || 0) * parsedQuantity).toFixed(0),
    ),
    totalSodium: parseFloat(
      ((recipe.totalSodium || 0) * parsedQuantity).toFixed(0),
    ),
  };
};

export const calcRecipeMacros = {
  calculateRecipeMacros,
};
