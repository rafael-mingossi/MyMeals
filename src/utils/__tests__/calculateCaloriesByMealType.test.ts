import {calcCalsByMealType} from '@utils';

import {utilsMocks} from '../utilsMocks.ts';

describe('calcCalsByMealType', () => {
  describe('calculateCaloriesByMealType', () => {
    it('should calculate total calories for each meal type', () => {
      expect(
        calcCalsByMealType.calculateCaloriesByMealType(utilsMocks.meal),
      ).toStrictEqual({
        breakfast: 330,
        lunch: 0,
        dinner: 0,
        snack: 0,
      });
    });
  });
});
