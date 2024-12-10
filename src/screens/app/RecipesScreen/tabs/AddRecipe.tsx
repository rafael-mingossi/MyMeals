import React from 'react';
import {FlatList, ScrollView} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useRecipeItems, useRecipeListService} from '@services';
import {macrosCalculations} from '@utils';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  Ingredient,
  OptionsDropdown,
  SeparatorBox,
  Text,
} from '@components';

import {addRecipeSchema, AddRecipeSchema} from './addRecipeSchema.ts';
import {NutritionalInfo} from './components/NutritionalInfo.tsx';

const list = [{label: 'Add Ingredient'}];

export function AddRecipe() {
  const navigation = useNavigation();
  const recipeItems = useRecipeItems();
  const {removeFoodFromRecipe} = useRecipeListService();
  const {control, formState, handleSubmit} = useForm<AddRecipeSchema>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      label: '',
      serv_unit: '',
      serv_size: undefined,
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box rowGap="s20">
        <Box rowGap="s20" mt="s8">
          <FormTextInput
            isUnderlinedVersion
            placeholder="Recipe name"
            label="New recipe name"
            name="label"
            control={control}
          />
          <FormTextInput
            isUnderlinedVersion
            placeholder="Serving size"
            label="Serving Size of the portion being logged"
            name="serv_size"
            keyboardType="number-pad"
            control={control}
          />
          <FormTextInput
            isUnderlinedVersion
            placeholder="Serving unit"
            label="Serving unit, (grams, slice, spoon, etc...)"
            name="serv_unit"
            control={control}
          />
        </Box>

        <Box>
          <SeparatorBox />
          <Box
            mt={'s8'}
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems="center">
            <Text preset="paragraphLarge" font="medium">
              {recipeItems.size} Ingredients
            </Text>
            <OptionsDropdown
              items={list}
              onChange={selected => {
                selected.label === 'Add Ingredient' &&
                  navigation.navigate('FoodsSelectionScreen');
              }}
            />
          </Box>
          <FlatList
            contentContainerStyle={{marginTop: 10}}
            scrollEnabled={false}
            data={Array.from(recipeItems.values())}
            renderItem={({item}) => (
              <Ingredient
                food={item.food}
                quantity={item.quantity}
                isEditing={true}
                onEdit={() => {
                  /* handle edit */
                }}
                onDelete={() => removeFoodFromRecipe(item.food.id)}
              />
            )}
          />
        </Box>

        <Box>
          <SeparatorBox />
          <Text preset="paragraphLarge" font="medium" mt={'s8'}>
            Recipe Totals
          </Text>
          <NutritionalInfo
            values={macrosCalculations.recipeTotals(recipeItems)}
          />
        </Box>
      </Box>
      <Box mt={'s24'}>
        <SeparatorBox />
        <Box flexDirection="row" paddingTop={'s14'} justifyContent={'flex-end'}>
          <ButtonText
            title={'Save Recipe'}
            disabled={!formState.isValid}
            onPress={onSubmit}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}
