import React from 'react';

import {ThemeProvider} from '@shopify/restyle';

import {theme} from '@theme';

import {Router} from './src/routes/Routes.tsx';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
