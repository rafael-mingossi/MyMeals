import React from 'react';

import Svg, {Line} from 'react-native-svg';

import {IconBase} from '@components';

export function PlusIcon({size = 20, color = 'black'}: IconBase) {
  return (
    <Svg
      stroke={color}
      fill={'none'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}
