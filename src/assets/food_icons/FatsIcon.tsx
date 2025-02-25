import React from 'react';

import Svg, {Circle, Defs, G, Path} from 'react-native-svg';

import {IconBase} from '@components';

export function FatsIcon({size = 40}: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Defs />
      <G
        style={{
          isolation: 'isolate',
        }}>
        <G id="Layer_1" data-name="Layer 1">
          <G id="Vector">
            <Path
              d="M51 22.81l-.8 33.51a5.49 5.49 0 01-5.5 5.38H19.42a5.52 5.52 0 01-5.52-5.37L13 22.82a6.83 6.83 0 016.83-7A3.85 3.85 0 0023.69 12V9.13a2.16 2.16 0 001 .24h14.6a2.16 2.16 0 001-.24V12a3.85 3.85 0 003.85 3.85A6.83 6.83 0 0151 22.81z"
              fill="#c65500"
            />
            <Path
              d="M41.58 4.59V7.1a2.25 2.25 0 01-1.27 2 2.16 2.16 0 01-1 .24h-14.6a2.16 2.16 0 01-1-.24 2.25 2.25 0 01-1.27-2V4.59a2.28 2.28 0 012.27-2.29h14.58a2.28 2.28 0 012.29 2.29z"
              fill="#e2e2e2"
            />
            <Circle cx={32} cy={37.5} r={11.4} fill="#f4a800" />
          </G>
          <G id="Line">
            <Path
              fill="none"
              stroke="#000"
              d="M51 22.81l-.8 33.51a5.49 5.49 0 01-5.5 5.38H19.42a5.52 5.52 0 01-5.52-5.37L13 22.82a6.83 6.83 0 016.83-7A3.85 3.85 0 0023.69 12V9.13a2.16 2.16 0 001 .24h14.6a2.16 2.16 0 001-.24V12a3.85 3.85 0 003.85 3.85A6.83 6.83 0 0151 22.81z"
            />
            <Path
              fill="none"
              stroke="#000"
              d="M41.58 4.59V7.1a2.25 2.25 0 01-1.27 2 2.16 2.16 0 01-1 .24h-14.6a2.16 2.16 0 01-1-.24 2.25 2.25 0 01-1.27-2V4.59a2.28 2.28 0 012.27-2.29h14.58a2.28 2.28 0 012.29 2.29z"
            />
            <Circle fill="none" stroke="#000" cx={32} cy={37.5} r={11.4} />
          </G>
          <Path
            d="M44.16 15.81A3.85 3.85 0 0140.31 12V9.13a2.16 2.16 0 01-1 .24 2.16 2.16 0 001-.24 2.25 2.25 0 001.27-2V4.59a2.28 2.28 0 00-2.29-2.29h-5a2.28 2.28 0 012.29 2.29V7.1a2.25 2.25 0 01-1.27 2 2.16 2.16 0 01-1 .24 2.16 2.16 0 001-.24V12a3.85 3.85 0 003.85 3.85 6.83 6.83 0 016.83 7l-.8 33.51a5.49 5.49 0 01-5.5 5.38h5a5.49 5.49 0 005.5-5.38L51 22.81a6.83 6.83 0 00-6.84-7z"
            id="Shadow"
          />
          <G
            id="Highligth"
            style={{
              mixBlendMode: 'overlay',
            }}>
            <Path
              d="M18.9 56.33L18 22.82a6.83 6.83 0 016.83-7A3.85 3.85 0 0028.69 12V9.13a2.25 2.25 0 01-1.27-2V4.59a2.28 2.28 0 012.29-2.29h-5a2.28 2.28 0 00-2.29 2.29V7.1a2.25 2.25 0 001.27 2V12a3.85 3.85 0 01-3.85 3.85 6.83 6.83 0 00-6.83 7l.89 33.51a5.52 5.52 0 005.52 5.37h5a5.52 5.52 0 01-5.52-5.4z"
              fill="#fff"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}
