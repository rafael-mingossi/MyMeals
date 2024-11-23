import React from 'react';

import {AuthCredentialsProvider} from '@services';
import {initialiseStorage, MMKVStorage} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {theme} from '@theme';

import {Router} from './src/routes/Routes.tsx';
// import {AuthCredentialsProvider} from './src/services/authCredentials/Providers/AuthCredentialsProvider';
// import {initialiseStorage, MMKVStorage} from './src/services/storage';

initialiseStorage(MMKVStorage);

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
