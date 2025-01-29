import React from 'react';

import {Meal, User} from '@domain';
import {calcMealTotals} from '@utils';

import {AnimatedBar, Box, Surface, Text} from '@components';

interface DailyMacrosProps {
  meals: Meal[];
  user: User;
}

export function DailyMacros({meals, user}: DailyMacrosProps) {
  return (
    <Surface>
      <Text preset={'headingSmall'} font={'semiBold'}>
        Daily Macros
      </Text>
      <AnimatedBar
        total={user.proteinGoal}
        current={calcMealTotals.calculateMealTotals(meals).totalProtein}
        label="Protein"
      />
      <Box flexDirection={'row'} columnGap={'s12'}>
        <Box flex={1}>
          <AnimatedBar
            total={user.carbsGoal}
            current={calcMealTotals.calculateMealTotals(meals).totalCarbs}
            label="Carbs"
          />
        </Box>
        <Box flex={1}>
          <AnimatedBar
            total={user.fatGoal}
            current={calcMealTotals.calculateMealTotals(meals).totalFat}
            label="Fat"
          />
        </Box>
      </Box>
    </Surface>
  );
}
