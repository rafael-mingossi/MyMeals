import React from 'react';
import {ScrollView} from 'react-native';

import {useUpdateUser} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToastService} from '@services';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  ScreenFixedHeader,
  SeparatorBox,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';

import {editUserSchema} from '../MeScreen/components/editUserSchema.ts';

export type UserInputValues = {
  username: string;
  full_name: string;
  dob: string;
  avatar_url: string;
  gender: string;
  height: string;
  weight: string;
  carbs_goal: string;
  fat_goal: string;
  cal_goal: string;
  protein_goal: string;
};

export function EditUserScreen({
  navigation,
  route,
}: AppScreenProps<'EditUserScreen'>) {
  const user = route.params.userData;

  const {showToast} = useToastService();
  const {control, formState, handleSubmit} = useForm<UserInputValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: user.username,
      full_name: user.fullName,
      dob: format(new Date(user.dob), 'dd-MM-yyyy'),
      // gender: user.gender,
      // avatar_url: user.avatarUrl,
      height: user.height?.toString(),
      weight: user.weight?.toString(),
      carbs_goal: user.carbsGoal?.toString(),
      fat_goal: user.fatGoal?.toString(),
      cal_goal: user.calGoal?.toString(),
      protein_goal: user.proteinGoal?.toString(),
    },
  });

  const {mutate: updateUserDetails, isPending} = useUpdateUser({
    onSuccess: () => {
      showToast({
        message: 'User was updated!',
      });
      navigation.goBack();
    },
    onError: errorMessage => {
      showToast({
        message: `Fail to upload ${errorMessage}`,
        type: 'error',
      });
    },
  });

  const onUpdate = (userDetails: UserInputValues) => {
    const formatedUserData = {
      id: user.id,
      full_name: userDetails.full_name,
      username: userDetails.username,
      dob: userDetails.dob,
      avatar_url: '',
      gender: '',
      height: Number(userDetails.height),
      weight: Number(userDetails.weight),
      carbs_goal: Number(userDetails.carbs_goal),
      fat_goal: Number(userDetails.fat_goal),
      cal_goal: Number(userDetails.cal_goal),
      protein_goal: Number(userDetails.protein_goal),
    };
    updateUserDetails(formatedUserData);
  };

  function onReturn() {
    navigation.goBack();
  }

  return (
    <ScreenFixedHeader
      title="Update User"
      fixedHeader={true}
      justifyContent={'space-between'}>
      <ScrollView>
        <Box
          borderBottomWidth={1}
          borderColor={'backgroundContrast'}
          mt={'s20'}
          marginVertical={'s4'}>
          <Text preset={'headingSmall'} paddingBottom={'s4'}>
            User Details
          </Text>
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Name: </Text>
          <FormTextInput name="full_name" fieldUnit={''} control={control} />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Username: </Text>
          <FormTextInput name="username" fieldUnit={''} control={control} />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Date of Birth: </Text>
          <FormTextInput name="dob" fieldUnit={''} control={control} />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Height: </Text>
          <FormTextInput name="height" fieldUnit={'cm'} control={control} />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Weight: </Text>
          <FormTextInput name="weight" fieldUnit={'kg'} control={control} />
        </Box>
        <Box
          borderBottomWidth={1}
          borderColor={'backgroundContrast'}
          mt={'s20'}
          marginVertical={'s4'}>
          <Text preset={'headingSmall'} paddingBottom={'s4'}>
            Daily Goals
          </Text>
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Calories: </Text>
          <FormTextInput name="cal_goal" fieldUnit={'g'} control={control} />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Carbs: </Text>
          <FormTextInput name="carbs_goal" fieldUnit={'g'} control={control} />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Protein: </Text>
          <FormTextInput
            name="protein_goal"
            fieldUnit={'g'}
            control={control}
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'} mt={'s12'}>
          <Text font={'semiBold'}>Fat: </Text>
          <FormTextInput name="fat_goal" fieldUnit={'g'} control={control} />
        </Box>
      </ScrollView>
      <Box>
        <SeparatorBox />
        <Box
          flexDirection="row"
          columnGap="s12"
          paddingTop={'s14'}
          justifyContent={'flex-end'}>
          <ButtonText title={'Return'} onPress={onReturn} />
          <ButtonText
            title={'Update'}
            onPress={handleSubmit(onUpdate)}
            disabled={!formState.isValid || isPending}
          />
        </Box>
      </Box>
    </ScreenFixedHeader>
  );
}
