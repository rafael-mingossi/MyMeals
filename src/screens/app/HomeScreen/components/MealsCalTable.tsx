import React from 'react';

import {Meal, MealsTypes, useDeleteMealsByTypeAndDate} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {macrosCalculations} from '@utils';

import {
  ActivityIndicator,
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

  const {mutate: deleteMealsByType, isPending: isDeletingAll} =
    useDeleteMealsByTypeAndDate({
      onSuccess: () => {
        console.log('DELETED');
      },
      onError: () => {
        console.log('DELETE ALL FAIL');
      },
    });

  const mealOfThisType = meals.find(meal => meal.mealType === type);

  function handleDeleteAllEntries() {
    if (!mealOfThisType) {
      return;
    }

    deleteMealsByType({
      userId: mealOfThisType.userId,
      date: mealOfThisType.dateAdded,
      mealType: type,
    });
  }

  const dropDownOptions: OptionItem[] = [
    {
      label: 'Edit Entries',
      onPress: () => {
        navigation.navigate('UpdateMealsScreen', {mealType: type, meals});
      },
    },
    {
      label: 'Remove All Entries',
      onPress: () => handleDeleteAllEntries(),
    },
  ];

  return isDeletingAll ? (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Box>
  ) : (
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
              items={dropDownOptions}
              onChange={selected => {
                const itemSel = dropDownOptions.find(
                  i => i.label === selected.label,
                );
                itemSel?.onPress?.();
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
