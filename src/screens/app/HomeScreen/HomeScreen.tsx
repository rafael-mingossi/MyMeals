import React from 'react';

import {useGetMealsByUserAndDate} from '@domain';
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
  Text,
} from '@components';
import {AppTabScreenProps} from '@routes';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {authCredentials} = useAuthCredentials();
  const {dateSelected} = useCalendar();

  const {meals, isLoading} = useGetMealsByUserAndDate(
    authCredentials?.user.id!,
    dateSelected.dateString,
  );

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  function openMenu() {
    SheetManager.show('bs-menu');
  }

  return (
    <ScreenFixedHeader
      fixedHeader={false}
      fixedCalendar={{
        enabled: true,
        component: <CalendarWidget />,
      }}>
      <CalendarModal />
      {meals.map(meal => (
        <Text key={meal.id}>Total Calories: {meal.totalCalories}</Text>
      ))}
      <ButtonFloat onPress={openMenu}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}
