import React from 'react';

import {Meal} from '@domain';
import {macrosCalculations} from '@utils';

import {Box, CalorieRing, Surface, Text} from '@components';

interface MealsCalTableProps {
  meals: Meal[];
}

export function MealsCalBudget({meals}: MealsCalTableProps) {
  return (
    <Surface alignItems={'center'}>
      <Box alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Calorie Budget</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          2,000
        </Text>
      </Box>
      <CalorieRing
        currentCalories={
          macrosCalculations.calculateMealTotals(meals).totalCalories
        }
        goalCalories={2000}
      />
      <Box position={'absolute'} top={60} left={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Breakfast</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {macrosCalculations
            .calculateCaloriesByMealType(meals)
            .breakfast.toFixed(0)}
        </Text>
      </Box>
      <Box position={'absolute'} top={130} left={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Lunch</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {macrosCalculations
            .calculateCaloriesByMealType(meals)
            .lunch.toFixed(0)}
        </Text>
      </Box>
      <Box position={'absolute'} top={130} right={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Snack</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {macrosCalculations
            .calculateCaloriesByMealType(meals)
            .snack.toFixed(0)}
        </Text>
      </Box>
      <Box position={'absolute'} top={60} right={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Dinner</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {macrosCalculations
            .calculateCaloriesByMealType(meals)
            .dinner.toFixed(0)}
        </Text>
      </Box>
    </Surface>
  );
}
