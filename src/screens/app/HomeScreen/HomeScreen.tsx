import React from 'react';
import {View} from 'react-native';

import {Text, TextInput, Button, ScreenFixedHeader} from '@components';

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
      <Text>HOME</Text>
      <TextInput placeholder="Testing" label="Testing" />
      <TextInput placeholder="Testing" label="Testing" isUnderlinedVersion />
      <Button title={'Create'} />
    </ScreenFixedHeader>
  );
}
