import React, {useEffect} from 'react';

import {AuthCredentialsProvider} from '@services';
import {initialiseStorage, MMKVStorage} from '@services';
import {useAppColor} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// import {theme} from '@theme';

import {useAppColorScheme} from '@hooks';
import {darkTheme, theme} from '@theme';

import {Router} from './src/routes/Routes.tsx';
import {settingsService} from './src/services/settings/settingsService.ts';
// import {useAppColor} from './src/services/settings';
// import {AuthCredentialsProvider} from './src/services/authCredentials/Providers/AuthCredentialsProvider';
// import {initialiseStorage, MMKVStorage} from './src/services/storage';

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
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
