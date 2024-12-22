import React from 'react';
import {ScrollView} from 'react-native';

import {AddFoodParams, Foods, useAddFood} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthCredentials, useToastService} from '@services';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  CategoryDropdown,
  FormTextInput,
  SeparatorBox,
  Text,
} from '@components';

import {addFoodSchema, AddFoodSchema} from './addFoodSchema.ts';

type AddFoodProps = {
  isUpdatingItem?: boolean;
  foodToUpdate?: Foods;
};

export function AddFood({isUpdatingItem = false, foodToUpdate}: AddFoodProps) {
  const {authCredentials} = useAuthCredentials();
  const {showToast} = useToastService();

  console.log({foodToUpdate});
  console.log(typeof foodToUpdate?.fibre);

  const {control, formState, handleSubmit, setValue, watch, reset} =
    useForm<AddFoodSchema>({
      resolver: zodResolver(addFoodSchema),
      defaultValues: {
        label: isUpdatingItem ? foodToUpdate?.label : '',
        category_id: isUpdatingItem ? foodToUpdate?.categoryId! : 1,
        protein: isUpdatingItem ? foodToUpdate?.protein : undefined,
        carbs: isUpdatingItem ? foodToUpdate?.carbs : undefined,
        fat: isUpdatingItem ? foodToUpdate?.fat : undefined,
        calories: isUpdatingItem ? foodToUpdate?.calories : undefined,
        fibre: isUpdatingItem ? foodToUpdate?.fibre : undefined,
        sodium: isUpdatingItem ? foodToUpdate?.sodium : undefined,
        serv_size: isUpdatingItem ? foodToUpdate?.servSize : undefined,
        serv_unit: isUpdatingItem ? foodToUpdate?.servUnit : '',
      },
      mode: 'onChange',
    });

  const {mutate: addFood, isPending} = useAddFood({
    onSuccess: () => {
      showToast({message: 'Food was added!', type: 'success'});
      reset();
    },
    onError: error => {
      showToast({message: error, type: 'error'});
    },
  });

  const onSubmit = handleSubmit(data => {
    if (!authCredentials?.session.user.id) {
      return;
    }

    const foodData: AddFoodParams = {
      user_id: authCredentials.session.user.id,
      label: data.label,
      category_id: data.category_id,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      calories: data.calories,
      fibre: data.fibre ?? 0,
      sodium: data.sodium ?? 0,
      serv_size: data.serv_size,
      serv_unit: data.serv_unit,
      food_img: '',
    };

    addFood(foodData);
  });

  const selectedCategoryId = watch('category_id');

  return (
    <ScrollView
      style={{marginTop: 10, paddingHorizontal: 16}}
      showsVerticalScrollIndicator={false}>
      <Box rowGap="s20">
        <CategoryDropdown
          value={selectedCategoryId}
          onChange={category => setValue('category_id', category.id)}
          error={formState.errors.category_id?.message}
        />
        <FormTextInput
          isUnderlinedVersion
          placeholder="Food name"
          label="New food name"
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
      <Text preset="paragraphLarge" font="medium" mt="s24">
        All Nutrients
      </Text>
      <SeparatorBox />
      <Box padding={'s16'} rowGap={'s10'} mb={'s24'}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Calories</Text>
          <FormTextInput
            name="calories"
            fieldUnit={'cals'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Protein</Text>
          <FormTextInput
            name="protein"
            fieldUnit={'g'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Carbs</Text>
          <FormTextInput
            name="carbs"
            fieldUnit={'g'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Fat</Text>
          <FormTextInput
            name="fat"
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Fibre</Text>
          <FormTextInput
            name="fibre"
            fieldUnit={'g'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Sodium</Text>
          <FormTextInput
            name="sodium"
            fieldUnit={'mg'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
      </Box>
      <SeparatorBox />
      <Box
        flexDirection="row"
        columnGap="s10"
        paddingTop={'s14'}
        justifyContent={'flex-end'}>
        <ButtonText title={'Reset'} onPress={() => reset()} />
        <ButtonText
          title={'Save'}
          onPress={onSubmit}
          disabled={!formState.isValid || isPending}
        />
      </Box>
    </ScrollView>
  );
}
