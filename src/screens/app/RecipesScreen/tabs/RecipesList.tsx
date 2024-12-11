import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Recipe, useGetRecipesByUser} from '@domain';
import {useAuthCredentials} from '@services';

import {
  ActivityIndicator,
  Box,
  Icon,
  Ingredient,
  SearchInput,
  Text,
} from '@components';

// export interface Foods {
//   id: number;
//   createdAt: Date;
//   userId: string;
//   label: string;
//   protein: number;
//   carbs: number;
//   fat: number;
//   calories: number;
//   fibre: number;
//   sodium: number;
//   servSize: number;
//   servUnit: string;
//   foodImg: string;
//   categoryId: number;
// }

export function RecipesList() {
  const {authCredentials} = useAuthCredentials();
  const [search, setSearch] = useState('');

  const {recipes, isLoading} = useGetRecipesByUser(
    authCredentials?.session.user.id as string,
  );

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  function renderItem({item}: ListRenderItemInfo<Recipe>) {
    const recipeToFood = {
      id: item.id,
      createdAt: item.createdAt,
      userId: item.userId,
      label: item.name,
      protein: item.totalProtein,
      carbs: item.totalCarbs,
      fat: item.totalFat,
      calories: item.totalCalories,
      fibre: item.totalFibre,
      sodium: item.totalSodium,
      servSize: item.serving,
      servUnit: item.servingUnit,
      foodImg: '',
      categoryId: null,
    };

    return <Ingredient food={recipeToFood} />;
  }

  function renderEmptyItem() {
    return (
      <Box mt={'s16'}>
        <Text>You don't have recipes created!</Text>
      </Box>
    );
  }

  function renderEmptyFilteredItem() {
    return (
      <Box>
        <Text>No recipes entries found!</Text>
      </Box>
    );
  }

  const filteredRecipes = recipes.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box flex={1}>
      {recipes.length > 0 && (
        <SearchInput
          placeholder="Search for a recipe"
          value={search}
          onChangeText={setSearch}
          LeftComponent={<Icon color="gray4" name="search" size={18} />}
        />
      )}
      <FlatList
        data={search.length === 0 ? recipes : filteredRecipes}
        renderItem={renderItem}
        ListEmptyComponent={
          search.length === 0 ? renderEmptyItem : renderEmptyFilteredItem
        }
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
}
