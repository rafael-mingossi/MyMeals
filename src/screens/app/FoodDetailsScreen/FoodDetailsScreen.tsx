import React, {useCallback, useMemo} from 'react';

import {FoodCategory, useGetFoodCategories} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMealItems, useRecipeListService} from '@services';
import {macrosCalculations} from '@utils';
import {useForm, useWatch} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  ItemHeader,
  ItemServing,
  Screen,
  SeparatorBox,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';

import {foodDetailsSchema, FoodDetailsSchema} from './foodDetailsSchema.ts';

export function FoodDetailsScreen({
  route,
  navigation,
}: AppScreenProps<'FoodDetailsScreen'>) {
  const prop = route?.params?.item;
  const isEditing = route?.params?.isViewOnly;
  const mealType = route?.params.mealType;

  const {foodCategories} = useGetFoodCategories();
  const {addFoodToRecipe} = useRecipeListService();
  const {toggleMealItem} = useMealItems();

  const {control, formState, handleSubmit} = useForm<FoodDetailsSchema>({
    resolver: zodResolver(foodDetailsSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = useWatch({
    control,
    name: 'quantity',
    defaultValue: 1,
  });

  const calculatedValues = useMemo(
    () => macrosCalculations.calculateFoodMacros(prop, quantity),
    [quantity, prop],
  );

  const selectedCategory: FoodCategory | undefined = foodCategories.find(
    cat => cat.id === prop.categoryId,
  );

  const onSubmit = handleSubmit(data => {
    const foodWithQuantity = {
      ...prop,
      createdAt: new Date(),
    };

    if (mealType) {
      toggleMealItem('food', foodWithQuantity, data.quantity, 'quantity');
      navigation.goBack();
    } else {
      addFoodToRecipe(foodWithQuantity, data.quantity);
      navigation.navigate('AppTabNavigator', {screen: 'RecipesScreen'});
    }
  });

  const renderNutrientRow = useCallback(
    (label: string, value: number, unit: string) => (
      <Box flexDirection={'row'} justifyContent={'space-between'}>
        <Text font={'semiBold'}>{label}</Text>
        <Text>
          {value.toFixed(0)} {unit}
        </Text>
      </Box>
    ),
    [],
  );
  return (
    <Screen canGoBack>
      <Box marginTop="s14" rowGap={'s14'}>
        <ItemHeader
          prop={prop?.label}
          selectedCategory={selectedCategory?.description}
        />
        {!isEditing && (
          <Box>
            <SeparatorBox />
            <Text
              font={'semiBold'}
              preset={'paragraphLarge'}
              marginVertical={'s8'}>
              Quantity:
            </Text>
            <FormTextInput
              keyboardType="decimal-pad"
              placeholder="1"
              name="quantity"
              fieldUnit=""
              control={control}
            />
          </Box>
        )}
        <ItemServing
          prop={prop?.servUnit}
          calculatedValues={calculatedValues}
        />

        <Box>
          <SeparatorBox />
          <Text
            font={'semiBold'}
            preset={'paragraphLarge'}
            marginVertical={'s8'}>
            Total macros:
          </Text>
          <Box rowGap={'s10'} mt={'s14'} paddingHorizontal={'s10'}>
            {renderNutrientRow('Protein', calculatedValues.protein, 'grams')}
            {renderNutrientRow('Fat', calculatedValues.fat, 'grams')}
            {renderNutrientRow('Carbs', calculatedValues.carbs, 'grams')}
            {renderNutrientRow('Fibre', calculatedValues.fibre, 'grams')}
            {renderNutrientRow('Sodium', calculatedValues.sodium, 'mgs')}
          </Box>
        </Box>
        <Box>
          <SeparatorBox />
          <Text
            font={'semiBold'}
            preset={'paragraphLarge'}
            marginVertical={'s8'}>
            Macros chart:
          </Text>
        </Box>
      </Box>
      {!isEditing && (
        <Box>
          <SeparatorBox />
          <Box mt={'s8'} alignSelf={'flex-end'}>
            <ButtonText
              title={'Add Item'}
              disabled={!formState.isValid}
              onPress={onSubmit}
            />
          </Box>
        </Box>
      )}
    </Screen>
  );
}
