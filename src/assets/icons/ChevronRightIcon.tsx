import React from 'react';

import Svg, {Polyline} from 'react-native-svg';

import {IconBase} from '@components';

export function ChevronRightIcon({size = 20, color = 'black'}: IconBase) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <Polyline points="9 18 15 12 9 6" />
    </Svg>
  );
}
