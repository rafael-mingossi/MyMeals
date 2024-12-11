import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {
  ScreenFixedHeader,
  CalendarModal,
  CalendarWidget,
  ButtonFloat,
  Icon,
} from '@components';

export function HomeScreen() {
  const navigation = useNavigation();

  function navigateToMeals() {
    navigation.navigate('MealsSelectionScreen', {mealType: 'breakfast'});
  }

  return (
    <ScreenFixedHeader
      fixedHeader={false}
      fixedCalendar={{
        enabled: true,
        component: <CalendarWidget />,
      }}>
      <CalendarModal />
      <ButtonFloat onPress={navigateToMeals}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}
