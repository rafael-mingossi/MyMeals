import React from 'react';

import {FoodCategory, useGetFoodCategories} from '@domain';

import {Box, Icon, Screen, Separator, Text} from '@components';
import {AppScreenProps} from '@routes';

export function FoodDetailsScreen({
  route,
}: AppScreenProps<'FoodDetailsScreen'>) {
  const prop = route?.params?.food;

  const {foodCategories} = useGetFoodCategories();

  const selectedCategory: FoodCategory | undefined = foodCategories.find(
    cat => cat.id === prop.categoryId,
  );

  return (
    <Screen canGoBack>
      <Box marginTop="s14" rowGap={'s14'}>
        <Box flexDirection="row" alignItems="center" columnGap="s14">
          {selectedCategory && (
            <Icon name={selectedCategory.description} size={33} />
          )}
          <Text preset="headingLarge" font={'semiBold'}>
            {prop?.label}
          </Text>
        </Box>
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
              {prop?.servSize} {prop?.servUnit}
            </Text>
            <Text preset={'paragraphLarge'} font={'bold'}>
              |
            </Text>
            <Text
              preset={'paragraphLarge'}
              font={'semiBold'}
              color={'greenPrimary'}>
              {prop?.calories} cals
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
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Protein</Text>
              <Text>{prop?.protein} grams</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Fat</Text>
              <Text>{prop?.fat} grams</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Carbs</Text>
              <Text>{prop?.carbs} gram</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Fibre</Text>
              <Text>{prop?.fibre} gram</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Sodium</Text>
              <Text>{prop?.sodium} mg</Text>
            </Box>
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
    </Screen>
  );
}
