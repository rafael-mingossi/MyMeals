import React from 'react';
import {ViewStyle} from 'react-native';

import {Text, Screen, TextInput, Button} from '@components';

export function HomeScreen() {
  return (
    <Screen style={$screen}>
      <Text>HOME</Text>
      <Text>HOME</Text>
      <Text>HOME</Text>
      <Text>HOME</Text>
      <TextInput placeholder="Testing" label="Testing" />
      <TextInput placeholder="Testing" label="Testing" isUnderlinedVersion />
      <Button title={'Create'} />
    </Screen>
  );
}

const $screen: ViewStyle = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingHorizontal: 10,
  flexGrow: 1,
};
