import React from 'react';

import {FoodCategory, Foods, useGetFoodCategories} from '@domain';

import {Box, CheckBox, Icon, Text} from '@components';

interface IngredientProps {
  food: Foods;
  isChecked?: boolean;
  onToggleCheck?: () => void;
}

export function Ingredient({
  food,
  isChecked = false,
  onToggleCheck = () => {},
}: IngredientProps) {
  const {foodCategories} = useGetFoodCategories();

  const selectedCategory: FoodCategory | undefined = foodCategories.find(
    cat => cat.id === food.categoryId,
  );

  return (
    <Box
      flexDirection="row"
      alignItems={'center'}
      columnGap={'s10'}
      paddingVertical={'s4'}
      justifyContent={'space-between'}>
      <Box flexDirection="row" alignItems={'center'} columnGap={'s10'}>
        <CheckBox isChecked={isChecked} onChange={onToggleCheck} />
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
      <Icon name={'more'} size={18} />
    </Box>
  );
}
