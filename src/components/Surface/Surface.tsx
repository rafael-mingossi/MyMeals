import React, {ReactNode} from 'react';

import {Box, BoxProps} from '@components';
import {$shadowProps} from '@theme';

interface SurfaceProps extends BoxProps {
  children: ReactNode;
}

export function Surface({children}: SurfaceProps) {
  return (
    <Box {...$boxShadow} style={$shadowProps}>
      {children}
    </Box>
  );
}

const $boxShadow: BoxProps = {
  backgroundColor: 'backgroundInner',
  mt: 's16',
  padding: 's10',
  borderRadius: 's8',
  rowGap: 's12',
};
