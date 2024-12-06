import React from 'react';

import {FoodCategory, Foods, useGetFoodCategories} from '@domain';

import {
  Box,
  CheckBox,
  Icon,
  OptionsDropdown,
  Text,
  TouchableOpacityBox,
} from '@components';

interface IngredientProps {
  food: Foods;
  isChecked?: boolean;
  onToggleCheck?: () => void;
  isEditing?: boolean;
  onIngredientPress?: () => void;
}

export function Ingredient({
  food,
  isChecked = false,
  onToggleCheck = () => {},
  isEditing = false,
  onIngredientPress = () => {},
}: IngredientProps) {
  const {foodCategories} = useGetFoodCategories();

  const selectedCategory: FoodCategory | undefined = foodCategories.find(
    cat => cat.id === food.categoryId,
  );

  const list = [{label: 'Edit'}, {label: 'Delete'}];

  return (
    <TouchableOpacityBox
      onPress={onIngredientPress}
      flexDirection="row"
      alignItems={'center'}
      columnGap={'s10'}
      paddingVertical={'s4'}
      justifyContent={'space-between'}>
      <Box flexDirection="row" alignItems={'center'} columnGap={'s10'}>
        {!isEditing ? (
          <CheckBox isChecked={isChecked} onChange={onToggleCheck} />
        ) : null}
        {selectedCategory && (
          <Icon name={selectedCategory.description} size={30} />
        )}
        <Box>
          <Text font={'bold'}>{food.label}</Text>
          <Box flexDirection="row">
            <Text
              font={'semiBold'}
              color={'greenPrimary'}
              preset={'paragraphSmall'}>
              {food.calories} cals /{' '}
            </Text>
            <Text preset={'paragraphSmall'}>
              {food.servSize} {food.servUnit}
            </Text>
          </Box>
        </Box>
      </Box>
      {isEditing ? (
        <OptionsDropdown
          items={list}
          onChange={selected => {
            console.log(selected.label);
          }}
        />
      ) : null}
    </TouchableOpacityBox>
  );
}
