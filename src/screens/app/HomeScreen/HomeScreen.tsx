import React from 'react';
import {ScrollView} from 'react-native';

import {
  useGetMealsByUserAndDate,
  useGetUserById,
  // useGetFoodByBarCode,
} from '@domain';
import {useAuthCredentials, useCalendar} from '@services';
import {SheetManager} from 'react-native-actions-sheet';

import {
  ScreenFixedHeader,
  CalendarModal,
  CalendarWidget,
  ButtonFloat,
  Icon,
  Box,
  ActivityIndicator,
} from '@components';
import {AppTabScreenProps} from '@routes';

import {DailyMacros} from './components/DailyMacros.tsx';
import {MealsCalBudget} from './components/MealsCalBudget.tsx';
import {MealsCaloriesTable} from './components/MealsCalTable.tsx';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {authCredentials} = useAuthCredentials();
  const {dateSelected} = useCalendar();

  // const barcode = '3017620429484';
  //
  // const {barcodeFood, error, isLoading: barLoad} = useGetFoodByBarCode(barcode);
  //
  // if (error) {
  //   console.log(error.message);
  // }
  //
  // if (barcodeFood) {
  //   console.log(barcodeFood);
  // }

  const {meals, isLoading} = useGetMealsByUserAndDate(
    authCredentials?.user.id as string,
    dateSelected.dateString,
  );

  const {user, isLoading: loadingUser} = useGetUserById(
    authCredentials?.user.id as string,
  );

  function openMenu() {
    SheetManager.show('bs-menu');
  }

  return (
    <ScreenFixedHeader
      fixedHeader={true}
      noPaddingHorizontal
      fixedCalendar={{
        enabled: true,
        component: <CalendarWidget />,
      }}>
      <CalendarModal />
      {isLoading || loadingUser ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 95,
          }}
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 10,
          }}>
          <MealsCalBudget meals={meals} calories_goal={user?.calGoal || 2000} />
          <MealsCaloriesTable meals={meals} />
          {user && <DailyMacros meals={meals} user={user} />}
        </ScrollView>
      )}
      <ButtonFloat onPress={openMenu} preset={'icon'}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}
