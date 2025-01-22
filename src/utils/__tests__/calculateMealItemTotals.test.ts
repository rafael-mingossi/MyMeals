import {calculateMealItemTotals} from '@utils';

import {utilsMocks} from '../utilsMocks.ts';

describe('calculateMealItemTotals', () => {
  describe('calculateTotals', () => {
    it('should calculate the totals of all mealItems inside a meal', () => {
      expect(
        calculateMealItemTotals.calculateTotals(utilsMocks.selectedMealItems),
      ).toStrictEqual({
        calories: 15,
        carbs: 15,
        fat: 15,
        protein: 15,
        fibre: 15,
        sodium: 15,
      });
    });
  });
});
