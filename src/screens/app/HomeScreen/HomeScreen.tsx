import React from 'react';

import {SheetManager} from 'react-native-actions-sheet';

import {
  ScreenFixedHeader,
  CalendarModal,
  CalendarWidget,
  ButtonFloat,
  Icon,
} from '@components';
import {AppTabScreenProps} from '@routes';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
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
      <ButtonFloat onPress={openMenu}>
        <Icon name={'plus'} size={30} color={'white'} />
      </ButtonFloat>
    </ScreenFixedHeader>
  );
}
