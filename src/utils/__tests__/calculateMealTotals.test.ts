import {calcMealTotals} from '@utils';

import {utilsMocks} from '../utilsMocks';

describe('calcMealTotals', () => {
  describe('calculateMealTotals', () => {
    it('should calculate meals totals depending on the quantity', () => {
      expect(calcMealTotals.calculateMealTotals(utilsMocks.meal)).toStrictEqual(
        {
          totalCalories: 330,
          totalFat: 220,
          totalFibre: 10,
          totalSodium: 0,
          totalProtein: 30,
          totalCarbs: 30,
        },
      );
    });
  });
});
