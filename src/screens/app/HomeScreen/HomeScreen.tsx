import React from 'react';

import {ScreenFixedHeader, CalendarCustom, CalendarWidget} from '@components';

export function HomeScreen() {
  return (
    <ScreenFixedHeader
      fixedHeader={false}
      fixedCalendar={{
        enabled: true,
        component: <CalendarWidget />,
      }}>
      <CalendarCustom />
    </ScreenFixedHeader>
  );
}
