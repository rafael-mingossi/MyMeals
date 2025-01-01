import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {
  Recipe,
  useGetFavouriteRecipesByUser,
  useGetRecipesById,
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

export function FavouriteRecipes() {
  const {authCredentials} = useAuthCredentials();
  const {favouriteRecipes} = useGetFavouriteRecipesByUser(
    authCredentials?.session.user.id as string,
  );

  const {toggleFavourite, isPending} = useToggleFavourite();

  const {recipes, isLoading} = useGetRecipesById(favouriteRecipes);

  const handleToggleFavorite = (userId: string, recipeId: number) => {
    if (!userId) {
      return;
    }

    toggleFavourite({
      userId: userId,
      recipeId: recipeId,
    });
  };

  const recipeOptions = (recipe: Recipe): OptionItem[] => {
    return [
      {
        label: 'Remove Favourite',
        onPress: () =>
          isPending ? () => {} : handleToggleFavorite(recipe.userId, recipe.id),
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
        <Text>You don't have favourite recipes!</Text>
      </Box>
    );
  }

  function renderItems({item}: ListRenderItemInfo<Recipe>) {
    return (
      <Ingredient
        item={item}
        key={`${item.id}`}
        isEditing={true}
        options={recipeOptions(item)}
      />
    );
  }

  return (
    <Box paddingTop={'s16'}>
      <FlatList
        data={recipes}
        renderItem={renderItems}
        ListEmptyComponent={renderEmptyItem}
      />
    </Box>
  );
}
