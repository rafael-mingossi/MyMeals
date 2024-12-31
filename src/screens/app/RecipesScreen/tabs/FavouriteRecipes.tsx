import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {
  Recipe,
  useGetFavouriteRecipesByUser,
  useToggleFavourite,
} from '@domain';
import {useAuthCredentials} from '@services';

import {Box, Ingredient, OptionItem, Text} from '@components';

export function FavouriteRecipes() {
  const {authCredentials} = useAuthCredentials();
  const {favouriteRecipes} = useGetFavouriteRecipesByUser(
    authCredentials?.session.user.id as string,
  );
  console.log({favouriteRecipes});

  //TODO: CREATE GET RECIPES BY ID LIKE IN FAV FOODS

  const {toggleFavourite, isPending} = useToggleFavourite();

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
    <Box>
      <FlatList
        data={[]}
        renderItem={renderItems}
        ListEmptyComponent={renderEmptyItem}
      />
    </Box>
  );
}
