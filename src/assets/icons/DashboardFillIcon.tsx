import React from 'react';

import Svg, {Rect} from 'react-native-svg';

import {IconBase} from '@components';

export function DashboardFillIcon({size = 20, color = 'black'}: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Rect x="2" y="2" width="9" height="11" rx="2" />
      <Rect x="13" y="2" width="9" height="7" rx="2" />
      <Rect x="2" y="15" width="9" height="7" rx="2" />
      <Rect x="13" y="11" width="9" height="11" rx="2" />
    </Svg>
  );
}
