import React from 'react';

import {ScreenFixedHeader, CalendarModal, CalendarWidget} from '@components';

export function HomeScreen() {
  return (
    <ScreenFixedHeader
      fixedHeader={false}
      fixedCalendar={{
        enabled: true,
        component: <CalendarWidget />,
      }}>
      <CalendarModal />
    </ScreenFixedHeader>
  );
}
