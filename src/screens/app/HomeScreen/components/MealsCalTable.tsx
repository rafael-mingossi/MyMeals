import React from 'react';

import {Meal} from '@domain';
import {macrosCalculations} from '@utils';

import {Box, BoxProps, Icon, Surface, Text} from '@components';

interface MealsCalTableProps {
  meals: Meal[];
}

export function MealsCaloriesTable({meals}: MealsCalTableProps) {
  return (
    <Surface>
      <Box {...$boxWrapper}>
        <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
          <Icon name={'breakfast'} size={29} />
          <Text font={'semiBold'}>Breakfast</Text>
        </Box>
        <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
          <Text
            preset={'headingMedium'}
            color={'greenPrimary'}
            font={'semiBold'}>
            {macrosCalculations
              .calculateCaloriesByMealType(meals)
              .breakfast.toFixed(0)}
          </Text>
          <Text color={'greenPrimary'} font={'semiBold'}>
            cals
          </Text>
        </Box>
      </Box>
      <Box {...$boxWrapper}>
        <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
          <Icon name={'lunch'} size={30} />
          <Text font={'semiBold'}>Lunch</Text>
        </Box>
        <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
          <Text
            preset={'headingMedium'}
            color={'greenPrimary'}
            font={'semiBold'}>
            {macrosCalculations
              .calculateCaloriesByMealType(meals)
              .lunch.toFixed(0)}
          </Text>
          <Text color={'greenPrimary'} font={'semiBold'}>
            cals
          </Text>
        </Box>
      </Box>
      <Box {...$boxWrapper}>
        <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
          <Icon name={'dinner'} size={30} />
          <Text font={'semiBold'}>Dinner</Text>
        </Box>
        <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
          <Text
            preset={'headingMedium'}
            color={'greenPrimary'}
            font={'semiBold'}>
            {macrosCalculations
              .calculateCaloriesByMealType(meals)
              .dinner.toFixed(0)}
          </Text>
          <Text color={'greenPrimary'} font={'semiBold'}>
            cals
          </Text>
        </Box>
      </Box>
      <Box {...$boxWrapper}>
        <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
          <Icon name={'snacks'} size={30} />
          <Text font={'semiBold'}>Snacks</Text>
        </Box>
        <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
          <Text
            preset={'headingMedium'}
            color={'greenPrimary'}
            font={'semiBold'}>
            {macrosCalculations
              .calculateCaloriesByMealType(meals)
              .snack.toFixed(0)}
          </Text>
          <Text color={'greenPrimary'} font={'semiBold'}>
            cals
          </Text>
        </Box>
      </Box>
    </Surface>
  );
}

const $boxWrapper: BoxProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
};
