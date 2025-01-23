import React from 'react';

import {Meal} from '@domain';
import {calcCalsByMealType, calcMealTotals} from '@utils';

import {Box, CalorieRing, Surface, Text} from '@components';

interface MealsCalTableProps {
  meals: Meal[];
  calories_goal: number;
}

export function MealsCalBudget({meals, calories_goal}: MealsCalTableProps) {
  return (
    <Surface alignItems={'center'}>
      <Box alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Calorie Budget</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {calories_goal}
        </Text>
      </Box>
      <CalorieRing
        currentCalories={
          calcMealTotals.calculateMealTotals(meals).totalCalories
        }
        goalCalories={calories_goal}
      />
      <Box position={'absolute'} top={60} left={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Breakfast</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {calcCalsByMealType
            .calculateCaloriesByMealType(meals)
            .breakfast.toFixed(0)}
        </Text>
      </Box>
      <Box position={'absolute'} top={130} left={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Lunch</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {calcCalsByMealType
            .calculateCaloriesByMealType(meals)
            .lunch.toFixed(0)}
        </Text>
      </Box>
      <Box position={'absolute'} top={130} right={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Snack</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {calcCalsByMealType
            .calculateCaloriesByMealType(meals)
            .snack.toFixed(0)}
        </Text>
      </Box>
      <Box position={'absolute'} top={60} right={20} alignItems={'center'}>
        <Text preset={'paragraphSmall'}>Dinner</Text>
        <Text preset={'headingMedium'} color={'bluePrimary'}>
          {calcCalsByMealType
            .calculateCaloriesByMealType(meals)
            .dinner.toFixed(0)}
        </Text>
      </Box>
    </Surface>
  );
}
