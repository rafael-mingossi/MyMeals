import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Foods, useGetFoodsByUser} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {useAuthCredentials} from '@services';

import {
  ActivityIndicator,
  Box,
  Icon,
  Ingredient,
  SearchInput,
  Text,
} from '@components';

interface FoodsListProps {
  checkedItems?: Set<string>;
  onToggleCheck?: (foodId: string) => void;
  isEditing?: boolean;
}

export function FoodsList({
  checkedItems,
  onToggleCheck,
  isEditing = false,
}: FoodsListProps) {
  const {authCredentials} = useAuthCredentials();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const {foods, isLoading} = useGetFoodsByUser(
    authCredentials?.session.user.id as string,
  );

  function renderItem({item}: ListRenderItemInfo<Foods>) {
    //Fix WARN: Non-serializable values were found in the navigation state.
    const foodForNavigation = {
      ...item,
      createdAt: item.createdAt.toISOString(),
    };
    return (
      <Ingredient
        food={item}
        isEditing={isEditing}
        onIngredientPress={() =>
          navigation.navigate('FoodDetailsScreen', {
            isViewOnly: isEditing,
            food: foodForNavigation,
          })
        }
        isChecked={checkedItems?.has(item.id.toString())}
        onToggleCheck={() => onToggleCheck?.(item.id.toString())}
      />
    );
  }

  function renderEmptyItem() {
    return (
      <Box>
        <Text>You don't have foods logged in!</Text>
      </Box>
    );
  }

  function renderEmptyFilteredItem() {
    return (
      <Box>
        <Text>No food entries found!</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  const filteredFoods = foods.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box flex={1}>
      <SearchInput
        placeholder="Search for a food item"
        value={search}
        onChangeText={setSearch}
        LeftComponent={<Icon color="gray4" name="search" size={18} />}
      />
      {search.length === 0 ? (
        <FlatList
          data={foods}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyItem}
        />
      ) : (
        <FlatList
          data={filteredFoods}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyFilteredItem}
        />
      )}
    </Box>
  );
}
