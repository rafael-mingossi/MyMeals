import React from 'react';

import {Box, SeparatorBox, Text} from '@components';
import {BaseNavigationParams} from '@routes';

// Base interface with common properties
interface ItemServingBase {
  servSize: number;
}

// Specific interfaces for different calorie property names
interface WithCalories extends ItemServingBase {
  calories: number;
  totalCalories?: never;
}

interface WithTotalCalories extends ItemServingBase {
  totalCalories: number;
  calories?: never;
}

// Union type for the calculated values
type CalculatedValues = WithCalories | WithTotalCalories;

interface ItemServingProps {
  prop: BaseNavigationParams['servUnit'];
  calculatedValues: CalculatedValues;
}

export function ItemServing({prop, calculatedValues}: ItemServingProps) {
  return (
    <Box>
      <SeparatorBox />
      <Text font={'semiBold'} preset={'paragraphLarge'} marginVertical={'s8'}>
        Per serving:
      </Text>

      <Box flexDirection="row" alignItems={'center'} columnGap={'s24'}>
        <Text preset={'paragraphLarge'} font={'semiBold'} color={'bluePrimary'}>
          {calculatedValues.servSize} {prop}
        </Text>
        <Text preset={'paragraphLarge'} font={'bold'}>
          |
        </Text>
        <Text
          preset={'paragraphLarge'}
          font={'semiBold'}
          color={'greenPrimary'}>
          {calculatedValues.calories?.toFixed(1) ||
            calculatedValues.totalCalories?.toFixed(1)}{' '}
          cals
        </Text>
      </Box>
    </Box>
  );
}
