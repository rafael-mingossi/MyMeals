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
        weight: 3,
        calories: 3,
        protein: 3,
        fat: 3,
        carbs: 3,
        fibre: 3,
        sodium: 3,
      });

      expect(
        calcRecipeTotals.recipeTotals(
          testRecipeItems.set(utilsMocks.food.id, {
            food: utilsMocks.food,
            quantity: 1,
          }),
        ),
      ).toStrictEqual({
        weight: 1,
        calories: 1,
        protein: 1,
        fat: 1,
        carbs: 1,
        fibre: 1,
        sodium: 1,
      });
    });
  });
});
