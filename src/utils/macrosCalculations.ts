import {Foods} from '@domain';

export interface CalculatedMacros {
  servSize: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fibre: number;
  sodium: number;
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

export const macrosCalculations = {
  calculateFoodMacros,
};
