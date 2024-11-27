import React from 'react';
import {View} from 'react-native';

import {Text, ScreenFixedHeader, CalendarCustom} from '@components';

export function HomeScreen() {
  return (
    <ScreenFixedHeader
      fixedHeader={false}
      fixedCalendar={{
        enabled: true,
        component: (
          <View style={{height: 40}}>
            <Text>CALENDAR</Text>
          </View>
        ),
      }}>
      <CalendarCustom />
    </ScreenFixedHeader>
  );
}
