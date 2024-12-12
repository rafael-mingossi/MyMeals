import React, {useMemo} from 'react';

import {useGetFoodCategories} from '@domain';

import {
  Box,
  CheckBox,
  Icon,
  OptionsDropdown,
  Text,
  TouchableOpacityBox,
} from '@components';

//Common props between Types
interface NutritionalItem {
  id: number;
  createdAt: Date;
  userId: string;
  label: string;
  servSize: number;
  servUnit: string;
}

//Props that can change between Types
interface BaseItem extends NutritionalItem {
  calories?: number;
  totalCalories?: number;
  categoryId?: number | null;
}

//Component Ingredient exclusive Types
interface IngredientProps<T extends BaseItem> {
  item: T;
  isSelected?: boolean;
  onSelect?: (item: T) => void;
  isEditing?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  quantity?: number;
  onIngredientPress?: () => void;
}

export function Ingredient<T extends BaseItem>({
  item,
  isSelected = false,
  onSelect,
  isEditing = false,
  onEdit,
  onDelete,
  quantity = 1,
  onIngredientPress,
}: IngredientProps<T>) {
  const {foodCategories} = useGetFoodCategories();

  const calories = item.calories || item.totalCalories || 0;

  const selectedCategory = foodCategories.find(
    cat => cat.id === item.categoryId,
  );

  const list = [
    {label: 'Edit', onPress: () => onEdit?.(item)},
    {label: 'Delete', onPress: () => onDelete?.(item)},
  ];

  const handlePress = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const adjustedValues = useMemo(
    () => ({
      calories: calories * quantity,
      servSize: item.servSize * quantity,
    }),
    [calories, item.servSize, quantity],
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
          <Text font={'bold'}>{item.label}</Text>
          <Box flexDirection="row">
            <Text
              font={'semiBold'}
              color={'greenPrimary'}
              preset={'paragraphSmall'}>
              {adjustedValues.calories.toFixed(0)} cals /{' '}
            </Text>
            <Text preset={'paragraphSmall'}>
              {adjustedValues.servSize.toFixed(0)} {item.servUnit}
            </Text>
          </Box>
        </Box>
      </Box>
      {isEditing && (
        <OptionsDropdown
          items={list}
          onChange={selected => {
            const itemSel = list.find(i => i.label === selected.label);
            itemSel?.onPress?.();
          }}
        />
      )}
    </TouchableOpacityBox>
  );
}
