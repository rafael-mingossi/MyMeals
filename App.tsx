import React, {useEffect} from 'react';

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
