import React from 'react';
import {ViewStyle} from 'react-native';

import {Text, Screen, TextInput} from '@components';

export function HomeScreen() {
  return (
    <Screen style={$screen}>
      <Text>HOME</Text>
      <Text>HOME</Text>
      <Text>HOME</Text>
      <Text>HOME</Text>
      <TextInput placeholder="Testing" />
    </Screen>
  );
}

const $screen: ViewStyle = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingHorizontal: 0,
  flexGrow: 1,
};
