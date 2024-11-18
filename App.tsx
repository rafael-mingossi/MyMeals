import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {ThemeProvider} from '@shopify/restyle';

import {Text} from '@components';
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
          <Text
            preset="headingMedium"
            color="paragraphGreen"
            font="mediumItalic">
            headingMedium
          </Text>
          <Text preset="headingMedium" color="paragraphGreen">
            headingMedium
          </Text>
          <Text preset="headingSmall" color="paragraphBlue">
            headingSmall
          </Text>
          <Text preset="headingSmall" color="paragraphBlue" font="semiBold">
            headingSmall
          </Text>
          <Text
            preset="paragraphMedium"
            color="paragraphBlue"
            font="semiBoldItalic">
            paragraphMedium
          </Text>
          <Text preset="paragraphSmall" color="greenPrimary" font="thinItalic">
            paragraphMedium
          </Text>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
