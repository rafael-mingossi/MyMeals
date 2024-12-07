import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Foods, useGetFoodsByUser} from '@domain';
import {useAuthCredentials} from '@services';

import {ActivityIndicator, Box, Ingredient} from '@components';

interface FoodsListProps {
  checkedItems?: Set<string>;
  onToggleCheck?: (foodId: string) => void;
  isEditing?: boolean;
  onItemPress?: (food: Foods) => void;
  scrollEnabled?: boolean;
}

export function FoodsList({
  checkedItems,
  onToggleCheck,
  onItemPress,
  isEditing = false,
  scrollEnabled = false,
}: FoodsListProps) {
  const {authCredentials} = useAuthCredentials();

  const {foods, isLoading} = useGetFoodsByUser(
    authCredentials?.session.user.id as string,
  );

  function renderItem({item}: ListRenderItemInfo<Foods>) {
    return (
      <Ingredient
        food={item}
        isEditing={isEditing}
        onIngredientPress={() => onItemPress?.(item)}
        isChecked={checkedItems?.has(item.id.toString())}
        onToggleCheck={() => onToggleCheck?.(item.id.toString())}
      />
    );
  }

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <FlatList
        data={foods}
        renderItem={renderItem}
        scrollEnabled={scrollEnabled}
      />
    </Box>
  );
}
