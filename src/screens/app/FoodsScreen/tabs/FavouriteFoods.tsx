import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {
  Foods,
  useGetFavouriteFoodsByUser,
  useGetFoodsByIds,
  useToggleFavourite,
} from '@domain';
import {useAuthCredentials} from '@services';

import {
  ActivityIndicator,
  Box,
  Ingredient,
  OptionItem,
  Text,
} from '@components';

export function FavouriteFoods() {
  const {authCredentials} = useAuthCredentials();
  const {favouriteFoods} = useGetFavouriteFoodsByUser(
    authCredentials?.session.user.id as string,
  );
  const {toggleFavourite, isPending} = useToggleFavourite();

  const {foods, isLoading} = useGetFoodsByIds(favouriteFoods);

  const handleToggleFavorite = (userId: string, foodId: number) => {
    if (!userId) {
      return;
    }

    toggleFavourite({
      userId: userId,
      foodId: foodId,
    });
  };

  const foodOptions = (food: Foods): OptionItem[] => {
    return [
      {
        label: 'Remove Favourite',
        onPress: () =>
          isPending ? () => {} : handleToggleFavorite(food.userId, food.id),
      },
    ];
  };

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  function renderEmptyItem() {
    return (
      <Box mt={'s16'}>
        <Text>You don't have favourite foods!</Text>
      </Box>
    );
  }

  function renderItems({item}: ListRenderItemInfo<Foods>) {
    return (
      <Ingredient
        item={item}
        key={`${item.id}`}
        isEditing={true}
        options={foodOptions(item)}
      />
    );
  }

  return (
    <Box paddingHorizontal={'s16'} paddingTop={'s16'}>
      <FlatList
        data={foods}
        renderItem={renderItems}
        ListEmptyComponent={renderEmptyItem}
      />
    </Box>
  );
}
