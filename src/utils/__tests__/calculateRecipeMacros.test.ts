import {calcRecipeMacros} from '@utils';

import {utilsMocks} from '../utilsMocks';

describe('calcRecipeMacros', () => {
  describe('calculateRecipeMacros', () => {
    it('should return the totals of quantity times each macro for a recipe', () => {
      expect(
        calcRecipeMacros.calculateRecipeMacros(utilsMocks.recipe, 1),
      ).toStrictEqual({
        servSize: 5,
        totalCalories: 5,
        totalProtein: 5,
        totalFat: 5,
        totalCarbs: 5,
        totalFibre: 5,
        totalSodium: 5,
      });
    });
  });
});
