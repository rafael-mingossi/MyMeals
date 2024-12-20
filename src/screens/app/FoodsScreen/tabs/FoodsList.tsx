import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {OnItemPressFoodNavigation, Foods, useGetFoodsByUser} from '@domain';
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
  selectedFoods?: Map<number, Foods>;
  onToggleCheck?: (food: Foods) => void;
  isEditing?: boolean;
  onEdit?: (food: Foods) => void;
  onDelete?: (food: Foods) => void;
  onIngredientPress?: (food: OnItemPressFoodNavigation) => void;
  hasHorizontalPadding?: boolean;
}

export function FoodsList({
  selectedFoods = new Map(),
  onEdit,
  onDelete,
  onToggleCheck,
  isEditing = false,
  onIngredientPress,
  hasHorizontalPadding = true,
}: FoodsListProps) {
  const {authCredentials} = useAuthCredentials();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const {foods, isLoading} = useGetFoodsByUser(
    authCredentials?.session.user.id as string,
  );

  function renderItem({item}: ListRenderItemInfo<Foods>) {
    const foodForNavigation = {
      ...item,
      createdAt: item.createdAt.toISOString(),
    };

    const handlePress = () => {
      if (isEditing) {
        navigation.navigate('FoodDetailsScreen', {
          isViewOnly: true,
          item: foodForNavigation,
        });
      } else {
        onIngredientPress && onIngredientPress(foodForNavigation);
      }
    };

    return (
      <Ingredient<Foods>
        item={item}
        isEditing={isEditing}
        isSelected={selectedFoods.has(item.id)}
        onSelect={onToggleCheck}
        onIngredientPress={handlePress}
        onDelete={food => {
          onDelete && onDelete(food);
          console.log('DELETE =>', food);
        }}
        onEdit={food => {
          onEdit && onEdit(food);
          console.log('EDIT =>', food);
        }}
      />
    );
  }

  function renderEmptyItem() {
    return (
      <Box mt={'s16'}>
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
    <Box flex={1} paddingHorizontal={hasHorizontalPadding ? 's16' : undefined}>
      {foods.length > 0 && (
        <SearchInput
          placeholder="Search for a food"
          value={search}
          onChangeText={setSearch}
          LeftComponent={<Icon color="gray4" name="search" size={18} />}
        />
      )}
      <FlatList
        data={search.length === 0 ? foods : filteredFoods}
        renderItem={renderItem}
        ListEmptyComponent={
          search.length === 0 ? renderEmptyItem : renderEmptyFilteredItem
        }
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
}
