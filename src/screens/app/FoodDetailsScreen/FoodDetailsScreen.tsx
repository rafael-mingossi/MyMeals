import React, {useCallback, useMemo} from 'react';

import {FoodCategory, useGetFoodCategories} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRecipeListService} from '@services';
import {useForm, useWatch} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  Icon,
  Screen,
  Separator,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';

import {foodDetailsSchema, FoodDetailsSchema} from './foodDetailsSchema.ts';

export function FoodDetailsScreen({
  route,
  navigation,
}: AppScreenProps<'FoodDetailsScreen'>) {
  const prop = route?.params?.food;
  const isEditing = route?.params?.isViewOnly;

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

  const calculatedValues = useMemo(() => {
    const parsedQuantity = parseFloat(quantity.toString()) || 1;
    return {
      servSize: prop.servSize * parsedQuantity,
      calories: prop.calories * parsedQuantity,
      protein: prop.protein * parsedQuantity,
      fat: prop.fat * parsedQuantity,
      carbs: prop.carbs * parsedQuantity,
      fibre: (prop.fibre || 0) * parsedQuantity,
      sodium: (prop.sodium || 0) * parsedQuantity,
    };
  }, [quantity, prop]);

  const {foodCategories} = useGetFoodCategories();
  const {addFoodToRecipe} = useRecipeListService();

  const selectedCategory: FoodCategory | undefined = foodCategories.find(
    cat => cat.id === prop.categoryId,
  );

  const onSubmit = handleSubmit(data => {
    const foodWithQuantity = {
      ...prop,
      createdAt: new Date(),
    };

    addFoodToRecipe(foodWithQuantity, data.quantity);
    navigation.navigate('AppTabNavigator', {screen: 'RecipesScreen'});
  });

  const renderNutrientRow = useCallback(
    (label: string, value: number, unit: string) => (
      <Box flexDirection={'row'} justifyContent={'space-between'}>
        <Text font={'semiBold'}>{label}</Text>
        <Text>
          {value.toFixed(1)} {unit}
        </Text>
      </Box>
    ),
    [],
  );
  return (
    <Screen canGoBack>
      <Box marginTop="s14" rowGap={'s14'}>
        <Box flexDirection="row" alignItems="center" columnGap="s8">
          {selectedCategory && (
            <Icon name={selectedCategory.description} size={33} />
          )}
          <Text preset="headingLarge" font={'semiBold'}>
            {prop?.label}
          </Text>
        </Box>
        {!isEditing && (
          <Box>
            <Box style={{marginHorizontal: -16}} mb="s8">
              <Separator />
            </Box>

            <Text font={'semiBold'} preset={'paragraphLarge'} mb={'s8'}>
              Quantity:
            </Text>
            <FormTextInput
              keyboardType="decimal-pad"
              placeholder="Qty"
              name="quantity"
              fieldUnit=""
              control={control}
            />
          </Box>
        )}
        <Box>
          <Box style={{marginHorizontal: -16}} mb="s8">
            <Separator />
          </Box>
          <Text font={'semiBold'} preset={'paragraphLarge'} mb={'s8'}>
            Per serving:
          </Text>

          <Box flexDirection="row" alignItems={'center'} columnGap={'s24'}>
            <Text
              preset={'paragraphLarge'}
              font={'semiBold'}
              color={'bluePrimary'}>
              {calculatedValues.servSize} {prop?.servUnit}
            </Text>
            <Text preset={'paragraphLarge'} font={'bold'}>
              |
            </Text>
            <Text
              preset={'paragraphLarge'}
              font={'semiBold'}
              color={'greenPrimary'}>
              {calculatedValues.calories.toFixed(1)} cals
            </Text>
          </Box>
        </Box>

        <Box>
          <Box style={{marginHorizontal: -16}} mb="s8">
            <Separator />
          </Box>
          <Text font={'semiBold'} preset={'paragraphLarge'} mb={'s8'}>
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
          <Box style={{marginHorizontal: -16}} mb="s8">
            <Separator />
          </Box>
          <Text font={'semiBold'} preset={'paragraphLarge'} mb={'s8'}>
            Macros chart:
          </Text>
        </Box>
      </Box>
      <Box>
        <Box style={{marginHorizontal: -16}} mb="s8">
          <Separator />
        </Box>
        <Box>
          <ButtonText
            title={'Add Item'}
            disabled={!formState.isValid}
            onPress={onSubmit}
          />
        </Box>
      </Box>
    </Screen>
  );
}
