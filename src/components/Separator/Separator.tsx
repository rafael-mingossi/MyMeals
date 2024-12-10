import React from 'react';

import {Box} from '../Box/Box';

export function Separator() {
  return <Box height={1} backgroundColor="onBackgroundGray2" width="100%" />;
}

export function SeparatorBox() {
  return (
    <Box style={{marginHorizontal: -20}}>
      <Box height={1} backgroundColor="onBackgroundGray2" width="100%" />
    </Box>
  );
}
