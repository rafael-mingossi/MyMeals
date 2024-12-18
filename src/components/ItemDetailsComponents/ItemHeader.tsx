import React from 'react';

import {FoodCategory} from '@domain';

import {Box, Icon, Text} from '@components';
import {FoodNavigationParams} from '@routes';

interface ItemHeaderProps {
  selectedCategory?: FoodCategory['description'] | undefined | 'recipes';
  prop: FoodNavigationParams['label'];
}

export function ItemHeader({selectedCategory, prop}: ItemHeaderProps) {
  return (
    <Box>
      <Box flexDirection="row" alignItems="center" columnGap="s8">
        {selectedCategory && <Icon name={selectedCategory} size={33} />}
        <Text preset="headingLarge" font={'semiBold'}>
          {prop}
        </Text>
      </Box>
    </Box>
  );
}
