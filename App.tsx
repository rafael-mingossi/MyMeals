import React, {useEffect} from 'react';

// import {PermissionsAndroid} from 'react-native';
// import {Platform} from 'react-native';
//
// import {getApp} from '@react-native-firebase/app';
// import {
//   getMessaging,
//   getToken,
//   requestPermission,
//   AuthorizationStatus,
// } from '@react-native-firebase/messaging';
import {AuthCredentialsProvider} from '@services';
import {initialiseStorage, MMKVStorage} from '@services';
import {useAppColor} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Toast} from '@components';
import {useAppColorScheme} from '@hooks';
import {darkTheme, theme} from '@theme';
import '@types/sheets';

import {Router} from './src/routes/Routes.tsx';
import {settingsService} from './src/services/settings/settingsService.ts';

initialiseStorage(MMKVStorage);

const queryClient = new QueryClient();

// // Get the messaging instance using getApp()
// const messaging = getMessaging(getApp());
//
// async function requestUserPermission() {
//   // Get token using the messaging instance
//   const token = await getToken(messaging);
//   console.log({tokenXXX: token});
//
//   if (Platform.OS === 'ios') {
//     const authStatus = await requestPermission(messaging);
//     const enabled =
//       authStatus === AuthorizationStatus.AUTHORIZED ||
//       authStatus === AuthorizationStatus.PROVISIONAL;
//
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   } else {
//     await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//   }
// }

function App(): React.JSX.Element {
  useAppColorScheme();
  const appColor = useAppColor();

  useEffect(() => {
    settingsService.handleStatusBar(appColor);
  }, [appColor]);

  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appColor === 'dark' ? darkTheme : theme}>
          <Router />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
