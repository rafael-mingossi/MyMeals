import React from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  OptionsDropdown,
  Separator,
  Text,
} from '@components';

import {addRecipeSchema, AddRecipeSchema} from './addRecipeSchema.ts';

const list = [{label: 'Add Ingredient'}];

export function AddRecipe() {
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
    <Box>
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
          <Box style={{marginHorizontal: -20}} mb="s8">
            <Separator />
          </Box>
          <Box
            paddingRight="s4"
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems="center">
            <Text preset="paragraphLarge" font="medium">
              0 Ingredients
            </Text>
            <OptionsDropdown
              items={list}
              onChange={selected => {
                console.log(selected.label);
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box style={{marginHorizontal: -20}} mb="s8">
            <Separator />
          </Box>
          <Text preset="paragraphLarge" font="medium">
            Recipe Totals
          </Text>
          <Box rowGap={'s10'} mt={'s14'} paddingHorizontal={'s10'}>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Weight</Text>
              <Text>300 g</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Calories</Text>
              <Text>800 cals</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Protein</Text>
              <Text>800 cals</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Fat</Text>
              <Text>800 cals</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Carbs</Text>
              <Text>800 cals</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Fibre</Text>
              <Text>800 cals</Text>
            </Box>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
              <Text font={'semiBold'}>Sodium</Text>
              <Text>800 cals</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box style={{marginHorizontal: -20}} mt="s24">
          <Separator />
        </Box>
        <Box
          flexDirection="row"
          paddingVertical={'s10'}
          justifyContent={'flex-end'}>
          <ButtonText
            title={'Save Recipe'}
            disabled={!formState.isValid}
            onPress={onSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
}
