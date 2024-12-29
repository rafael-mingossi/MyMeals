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
  OptionItem,
  SearchInput,
  Text,
} from '@components';

interface FoodsListProps {
  selectedFoods?: Map<number, Foods>;
  onToggleCheck?: (food: Foods) => void;
  isEditing?: boolean;
  onIngredientPress?: (food: Foods) => void;
  hasHorizontalPadding?: boolean;
  showArchived?: boolean;
  createOptions: (item: Foods) => OptionItem[];
}

export function FoodsList({
  selectedFoods = new Map(),
  onToggleCheck,
  isEditing = false,
  onIngredientPress,
  hasHorizontalPadding = true,
  createOptions,
}: FoodsListProps) {
  const {authCredentials} = useAuthCredentials();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const {foods, isLoading} = useGetFoodsByUser(
    authCredentials?.session.user.id as string,
  );

  function renderItem({item}: ListRenderItemInfo<Foods>) {
    const handlePress = () => {
      //isEditing goes to ItemDetails and user can change quantity to add to a list
      if (isEditing) {
        navigation.navigate('FoodDetailsScreen', {
          isViewOnly: true,
          item: item,
        });
      } else {
        onIngredientPress && onIngredientPress(item);
      }
    };

    return (
      <Ingredient<Foods>
        item={item}
        isEditing={isEditing}
        isSelected={selectedFoods.has(item.id)}
        onSelect={onToggleCheck}
        onIngredientPress={handlePress}
        options={createOptions(item)}
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
