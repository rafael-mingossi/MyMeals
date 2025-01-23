import {macrosCalculations} from '@utils';

import {utilsMocks} from '../utilsMocks.ts';

describe('macrosCalculations', () => {
  describe('calculateFoodMacros', () => {
    it('should calculate the totals of a Food macros by quantity', () => {
      expect(
        macrosCalculations.calculateFoodMacros(utilsMocks.food, 3),
      ).toStrictEqual({
        calories: 30,
        protein: 30,
        fat: 30,
        carbs: 30,
        fibre: 30,
        sodium: 30,
        servSize: 30,
      });
    });
  });
});
