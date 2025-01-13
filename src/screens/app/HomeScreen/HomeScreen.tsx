import React from 'react';
import {ScrollView} from 'react-native';

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
  Surface,
} from '@components';
import {AppTabScreenProps} from '@routes';

import {MealsCalBudget} from './components/MealsCalBudget.tsx';
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
      fixedHeader={true}
      noPaddingHorizontal
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
        <Box flex={1}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}>
            <MealsCalBudget meals={meals} />
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
                  {macrosCalculations.calculateMealTotals(meals).totalCarbs}{' '}
                  grams
                </Text>
              </Box>
            </Surface>
            <MealsCaloriesTable meals={meals} />
          </ScrollView>
        </Box>
      )}
      <ButtonFloat onPress={openMenu}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}
