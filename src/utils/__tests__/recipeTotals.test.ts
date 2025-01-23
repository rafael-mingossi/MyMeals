import {calcRecipeTotals} from '@utils';

import {utilsMocks} from '../utilsMocks.ts';

describe('calcRecipeTotals', () => {
  describe('recipeTotals', () => {
    it('should calculate food Total per item for recipe items', () => {
      const testRecipeItems = new Map();

      expect(
        calcRecipeTotals.recipeTotals(
          testRecipeItems.set(utilsMocks.food.id, {
            food: utilsMocks.food,
            quantity: 3,
          }),
        ),
      ).toStrictEqual({
        weight: 30,
        calories: 30,
        protein: 30,
        fat: 30,
        carbs: 30,
        fibre: 30,
        sodium: 30,
      });

      expect(
        calcRecipeTotals.recipeTotals(
          testRecipeItems.set(utilsMocks.food.id, {
            food: utilsMocks.food,
            quantity: 1,
          }),
        ),
      ).toStrictEqual({
        weight: 10,
        calories: 10,
        protein: 10,
        fat: 10,
        carbs: 10,
        fibre: 10,
        sodium: 10,
      });
    });
  });
});
