import {Foods} from '@domain';

const recipeTotals = (items: Map<number, {food: Foods; quantity: number}>) => {
  return Array.from(items.values()).reduce(
    (acc, {food, quantity}) => {
      // Calculate the same way as backend
      const factor = quantity / food.servSize;

      return {
        weight: (acc.weight || 0) + quantity,
        calories: acc.calories + food.calories * factor,
        protein: acc.protein + food.protein * factor,
        fat: acc.fat + food.fat * factor,
        carbs: acc.carbs + food.carbs * factor,
        fibre: acc.fibre + (food.fibre || 0) * factor,
        sodium: acc.sodium + (food.sodium || 0) * factor,
      };
    },
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

export const calcRecipeTotals = {
  recipeTotals,
};
