import React from 'react';

import Svg, {Path} from 'react-native-svg';

import {IconBase} from '@components';

export function BagIcon({size = 20, color = 'black'}: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.742 20.555C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445m-16.516 0c-1.2-1.446-.789-3.64.034-8.03.586-3.12.878-4.681 1.99-5.603M3.741 20.555s0 0 0 0zm16.516 0c1.2-1.446.788-3.64-.034-8.03-.586-3.12-.878-4.681-1.99-5.603m2.024 13.633s0 0 0 0zM18.235 6.922C17.124 6 15.536 6 12.36 6h-.722c-3.175 0-4.763 0-5.874.922m12.47 0s0 0 0 0zm-12.47 0s0 0 0 0z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        opacity={0.5}
        d="M9 6V5a3 3 0 116 0v1"
        stroke={color}
        strokeWidth={1.5}
        fill={'none'}
        strokeLinecap="round"
      />
    </Svg>
  );
}
