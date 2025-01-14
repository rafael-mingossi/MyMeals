import React from 'react';

import {Meal, MealsTypes} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {macrosCalculations} from '@utils';

import {
  Box,
  BoxProps,
  Icon,
  OptionItem,
  OptionsDropdown,
  Surface,
  Text,
} from '@components';

interface MealsCalTableProps {
  meals: Meal[];
}

interface MealLineItemProps {
  type: MealsTypes;
  meals: Meal[];
  showOptions?: boolean;
}

export function MealLineItem({
  type,
  meals,
  showOptions = true,
}: MealLineItemProps) {
  const navigation = useNavigation();

  function dropDownOptions(): OptionItem[] {
    return [
      {
        label: 'Edit Entries',
        onPress: () => {
          navigation.navigate('UpdateMealsScreen', {mealType: type, meals});
        },
      },
      {
        label: 'Remove All Entries',
        onPress: () => {},
      },
    ];
  }

  return (
    <Box {...$boxWrapper}>
      <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
        <Icon name={type} size={29} />
        <Text font={'semiBold'} style={{textTransform: 'capitalize'}}>
          {type}
        </Text>
      </Box>
      <Box
        flexDirection={'row'}
        columnGap={'s2'}
        alignItems={'flex-end'}
        justifyContent={'center'}>
        <Text preset={'headingMedium'} color={'greenPrimary'} font={'semiBold'}>
          {macrosCalculations
            .calculateCaloriesByMealType(meals)
            [type].toFixed(0)}
        </Text>
        <Text color={'greenPrimary'} font={'semiBold'}>
          cals
        </Text>
        {showOptions && (
          <Box
            padding={'s2'}
            alignSelf={'center'}
            alignItems={'center'}
            justifyContent={'center'}>
            <OptionsDropdown
              items={dropDownOptions()}
              onChange={selected => {
                selected.label === 'Edit Meals' &&
                  navigation.navigate('UpdateMealsScreen', {
                    mealType: type,
                    meals,
                  });
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export function MealsCaloriesTable({meals}: MealsCalTableProps) {
  return (
    <Surface>
      <MealLineItem type={'breakfast'} meals={meals} />
      <MealLineItem type={'lunch'} meals={meals} />
      <MealLineItem type={'dinner'} meals={meals} />
      <MealLineItem type={'snack'} meals={meals} />
    </Surface>
  );
}

const $boxWrapper: BoxProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
};
