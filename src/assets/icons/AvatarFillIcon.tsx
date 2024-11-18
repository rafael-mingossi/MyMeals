import React from 'react';

import Svg, {Path, Circle} from 'react-native-svg';

import {IconBase} from '@components';

export function AvatarFillIcon({size = 20, color = 'black'}: IconBase) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill={color}
      preserveAspectRatio="xMidYMid meet">
      <Path d="M30.61,24.52a17.16,17.16,0,0,0-25.22,0,1.51,1.51,0,0,0-.39,1v6A1.5,1.5,0,0,0,6.5,33h23A1.5,1.5,0,0,0,31,31.5v-6A1.51,1.51,0,0,0,30.61,24.52Z" />
      <Circle cx="18" cy="10" r="7" />
    </Svg>
  );
}
