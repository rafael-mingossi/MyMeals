import React from 'react';

import {useGetMealsByUserAndDate} from '@domain';
import {useAuthCredentials, useCalendar} from '@services';
import {macrosCalculations} from '@utils';
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
  CalorieRing,
  Surface,
} from '@components';
import {AppTabScreenProps} from '@routes';

import {MealsCaloriesTable} from './components/MealsCalTable.tsx';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {authCredentials} = useAuthCredentials();
  const {dateSelected} = useCalendar();

  const {meals, isLoading} = useGetMealsByUserAndDate(
    authCredentials?.user.id as string,
    dateSelected.dateString,
  );

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
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <Box>
          <Surface alignItems={'center'}>
            <Box alignItems={'center'}>
              <Text>Calorie Budget</Text>
              <Text preset={'headingMedium'} color={'bluePrimary'}>
                2,000
              </Text>
            </Box>
            <CalorieRing
              currentCalories={
                macrosCalculations.calculateMealTotals(meals).totalCalories
              }
              goalCalories={2000}
            />
          </Surface>
          <Surface>
            <Box justifyContent={'space-between'} flexDirection={'row'}>
              <Text>Total Protein:</Text>
              <Text>
                {macrosCalculations.calculateMealTotals(meals).totalProtein}{' '}
                grams
              </Text>
            </Box>
            <Box justifyContent={'space-between'} flexDirection={'row'}>
              <Text>Total Carbs:</Text>
              <Text>
                {macrosCalculations.calculateMealTotals(meals).totalCarbs} grams
              </Text>
            </Box>
          </Surface>
          <MealsCaloriesTable meals={meals} />
        </Box>
      )}
      <ButtonFloat onPress={openMenu}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}
