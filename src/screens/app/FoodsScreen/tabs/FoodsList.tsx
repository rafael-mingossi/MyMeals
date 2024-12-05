import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Foods, useGetFoodsByUser} from '@domain';
import {useAuthCredentials} from '@services';

import {ActivityIndicator, Box, Ingredient} from '@components';

export function FoodsList() {
  const {authCredentials} = useAuthCredentials();

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const {foods, isLoading} = useGetFoodsByUser(
    authCredentials?.session.user.id as string,
  );

  function renderItem({item}: ListRenderItemInfo<Foods>) {
    return (
      <Ingredient
        food={item}
        isChecked={checkedItems.has(item.id.toString())}
        onToggleCheck={() => handleToggleCheck(item.id.toString())}
      />
    );
  }

  const handleToggleCheck = (foodId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(foodId)) {
        newSet.delete(foodId);
      } else {
        newSet.add(foodId);
      }
      return newSet;
    });
  };

  return (
    <Box>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={foods} renderItem={renderItem} scrollEnabled={false} />
      )}
    </Box>
  );
}
