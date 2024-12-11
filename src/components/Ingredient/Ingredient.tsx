import React, {useMemo} from 'react';

import {Foods, useGetFoodCategories} from '@domain';

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
  isSelected?: boolean;
  onSelect?: (food: Foods) => void;
  isEditing?: boolean;
  onEdit?: (food: Foods) => void;
  onDelete?: (food: Foods) => void;
  quantity?: number;
  onIngredientPress?: () => void;
}

export function Ingredient({
  food,
  isSelected = false,
  onSelect,
  isEditing = false,
  onEdit,
  onDelete,
  quantity = 1,
  onIngredientPress,
}: IngredientProps) {
  const {foodCategories} = useGetFoodCategories();

  const selectedCategory = foodCategories.find(
    cat => cat.id === food.categoryId,
  );

  const list = [
    {label: 'Edit', onPress: () => onEdit?.(food)},
    {label: 'Delete', onPress: () => onDelete?.(food)},
  ];

  const handlePress = () => {
    if (onSelect) {
      onSelect(food);
    }
  };

  const adjustedValues = useMemo(
    () => ({
      calories: food.calories * quantity,
      servSize: food.servSize * quantity,
    }),
    [food.calories, food.servSize, quantity],
  );

  return (
    <TouchableOpacityBox
      onPress={onIngredientPress}
      flexDirection="row"
      alignItems={'center'}
      columnGap={'s10'}
      paddingVertical={'s4'}
      justifyContent={'space-between'}>
      <Box flexDirection="row" alignItems={'center'} columnGap={'s10'}>
        {!isEditing && onSelect && (
          <CheckBox isChecked={isSelected} onChange={handlePress} />
        )}
        {selectedCategory ? (
          <Icon name={selectedCategory.description} size={30} />
        ) : (
          <Icon name={'recipes'} size={30} />
        )}
        <Box>
          <Text font={'bold'}>{food.label}</Text>
          <Box flexDirection="row">
            <Text
              font={'semiBold'}
              color={'greenPrimary'}
              preset={'paragraphSmall'}>
              {adjustedValues.calories.toFixed(0)} cals /{' '}
            </Text>
            <Text preset={'paragraphSmall'}>
              {adjustedValues.servSize.toFixed(0)} {food.servUnit}
            </Text>
          </Box>
        </Box>
      </Box>
      {isEditing && (
        <OptionsDropdown
          items={list}
          onChange={selected => {
            const item = list.find(i => i.label === selected.label);
            item?.onPress?.();
          }}
        />
      )}
    </TouchableOpacityBox>
  );
}
