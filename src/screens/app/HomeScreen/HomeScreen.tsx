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
  BoxProps,
  CalorieRing,
} from '@components';
import {AppTabScreenProps} from '@routes';
import {$shadowProps} from '@theme';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {authCredentials} = useAuthCredentials();
  const {dateSelected} = useCalendar();

  const {meals, isLoading} = useGetMealsByUserAndDate(
    authCredentials?.user.id as string,
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
      <Box {...$boxShadow} style={$shadowProps} alignItems={'center'}>
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
          strokeWidth={15}
        />
      </Box>
      <Box {...$boxShadow} style={$shadowProps}>
        <Box justifyContent={'space-between'} flexDirection={'row'}>
          <Text>Total Protein:</Text>
          <Text>
            {macrosCalculations.calculateMealTotals(meals).totalProtein} grams
          </Text>
        </Box>
        <Box justifyContent={'space-between'} flexDirection={'row'}>
          <Text>Total Carbs:</Text>
          <Text>
            {macrosCalculations.calculateMealTotals(meals).totalCarbs} grams
          </Text>
        </Box>
      </Box>

      <Box {...$boxShadow} style={$shadowProps}>
        <Box
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
            <Icon name={'breakfast'} size={29} />
            <Text font={'semiBold'}>Breakfast</Text>
          </Box>
          <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
            <Text
              preset={'headingMedium'}
              color={'greenPrimary'}
              font={'semiBold'}>
              {macrosCalculations
                .calculateCaloriesByMealType(meals)
                .breakfast.toFixed(0)}
            </Text>
            <Text color={'greenPrimary'} font={'semiBold'}>
              cals
            </Text>
          </Box>
        </Box>
        <Box
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
            <Icon name={'lunch'} size={30} />
            <Text font={'semiBold'}>Lunch</Text>
          </Box>
          <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
            <Text
              preset={'headingMedium'}
              color={'greenPrimary'}
              font={'semiBold'}>
              {macrosCalculations
                .calculateCaloriesByMealType(meals)
                .lunch.toFixed(0)}
            </Text>
            <Text color={'greenPrimary'} font={'semiBold'}>
              cals
            </Text>
          </Box>
        </Box>
        <Box
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
            <Icon name={'dinner'} size={30} />
            <Text font={'semiBold'}>Dinner</Text>
          </Box>
          <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
            <Text
              preset={'headingMedium'}
              color={'greenPrimary'}
              font={'semiBold'}>
              {macrosCalculations
                .calculateCaloriesByMealType(meals)
                .dinner.toFixed(0)}
            </Text>
            <Text color={'greenPrimary'} font={'semiBold'}>
              cals
            </Text>
          </Box>
        </Box>
        <Box
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <Box flexDirection={'row'} columnGap={'s10'} alignItems={'center'}>
            <Icon name={'snacks'} size={30} />
            <Text font={'semiBold'}>Snacks</Text>
          </Box>
          <Box flexDirection={'row'} columnGap={'s2'} alignItems={'flex-end'}>
            <Text
              preset={'headingMedium'}
              color={'greenPrimary'}
              font={'semiBold'}>
              {macrosCalculations
                .calculateCaloriesByMealType(meals)
                .snack.toFixed(0)}
            </Text>
            <Text color={'greenPrimary'} font={'semiBold'}>
              cals
            </Text>
          </Box>
        </Box>
      </Box>
      <ButtonFloat onPress={openMenu}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}

const $boxShadow: BoxProps = {
  backgroundColor: 'backgroundInner',
  mt: 's16',
  padding: 's10',
  borderRadius: 's8',
  rowGap: 's12',
};
