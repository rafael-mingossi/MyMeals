import React from 'react';

import Svg, {Path} from 'react-native-svg';

import {IconBase} from '@components';

export function AvatarIcon({size = 20, color = 'black'}: IconBase) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill={color}
      preserveAspectRatio="xMidYMid meet">
      <Path d="M18,17a7,7,0,1,0-7-7A7,7,0,0,0,18,17ZM18,5a5,5,0,1,1-5,5A5,5,0,0,1,18,5Z" />
      <Path d="M30.47,24.37a17.16,17.16,0,0,0-24.93,0A2,2,0,0,0,5,25.74V31a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V25.74A2,2,0,0,0,30.47,24.37ZM29,31H7V25.73a15.17,15.17,0,0,1,22,0h0Z" />
    </Svg>
  );
}
