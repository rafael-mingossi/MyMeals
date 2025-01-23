import {Foods} from '@domain';

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

export const calcRecipeTotals = {
  recipeTotals,
};
