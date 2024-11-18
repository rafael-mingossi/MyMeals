import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {ThemeProvider} from '@shopify/restyle';

import {Icon, Text} from '@components';
import {theme} from '@theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View>
          <Text preset="headingLarge" color="paragraphOrange" font="extraBold">
            headingLarge
          </Text>
          <Text
            preset="headingLarge"
            color="paragraphOrange"
            font="blackItalic">
            headingLarge
          </Text>
          <Icon size={20} name="arrowLeft" color="primary" />
          <Icon size={20} name="avatar" color="primary" />
          <Icon size={20} name="avatarFill" color="primary" />
          <Icon size={20} name="dashboard" color="primary" />
          <Icon size={20} name="dashboardFill" color="primary" />
          <Icon size={20} name="food" color="primary" />
          <Icon size={20} name="foodFill" color="primary" />
          <Icon size={20} name="recipe" color="primary" />
          <Icon size={20} name="recipeFill" color="primary" />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
