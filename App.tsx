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
          <Text preset="headingLarge" color="paragraphOrange">
            headingLarge
          </Text>
          <Text preset="headingLarge" color="paragraphOrange" extraBold>
            headingLarge extra
          </Text>
          <Text preset="headingMedium" color="paragraphGreen">
            headingMedium
          </Text>
          <Text preset="headingMedium" color="paragraphGreen" extraBold>
            headingMedium extra
          </Text>
          <Text preset="headingSmall" color="paragraphBlue">
            headingSmall
          </Text>
          <Text preset="headingSmall" color="paragraphBlue" extraBold>
            headingSmall extra
          </Text>
          <Text preset="paragraphMedium" color="paragraphBlue">
            paragraphMedium
          </Text>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
