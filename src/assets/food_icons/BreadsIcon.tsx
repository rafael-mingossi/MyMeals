import React from 'react';

import Svg, {Path, Circle, Ellipse} from 'react-native-svg';

import {IconBase} from '@components';

export function BreadsIcon({size = 512}: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Path
        d="M341.333 85.333H170.667C88.193 85.333 21.333 133.09 21.333 192c0 20.04 7.878 38.717 21.334 54.734v179.933h426.666V256c13.456-16.017 21.334-43.96 21.334-64 0-58.91-66.86-106.667-149.334-106.667z"
        fill="#ad6143"
      />
      <Path
        d="M320 192c0-58.91-66.86-106.667-149.333-106.667S21.333 133.09 21.333 192c0 20.04 7.878 47.983 21.334 64v170.667h256V256C312.122 239.983 320 212.04 320 192z"
        fill="#c99884"
      />
      <Path
        d="M85.333 405.333H64V248.23l-5-5.948c-9.156-10.906-16.333-32.99-16.333-50.281 0-47.052 57.416-85.333 128-85.333V128C113.844 128 64 157.906 64 192c0 13.198 5.98 30.188 11.333 36.552l10 11.906z"
        fill="#d7b2a4"
      />
      <Path
        d="M298.667 426.667H85.333v-21.334h192V248.23l5-5.948c10.22-12.177 16.334-35.125 16.334-50.281 0-47.052-57.417-85.333-128-85.333V85.333C253.01 85.333 320 133.188 320 192c0 19.177-7.323 47.323-21.333 64z"
        fill="#b7745a"
      />
      <Circle cx={181.33333} cy={160} r={10.66667} fill="#b7745a" />
      <Ellipse
        cx={117.33333}
        cy={256}
        rx={10.66667}
        ry={21.33333}
        fill="#b7745a"
      />
      <Circle cx={234.66667} cy={277.33333} r={21.33333} fill="#b7745a" />
      <Circle cx={160} cy={330.66667} r={10.66667} fill="#b7745a" />
      <Circle cx={96} cy={373.33333} r={10.66667} fill="#b7745a" />
      <Path d="M298.66667 256H469.33334V426.66667H298.66667z" fill="#a34e2d" />
      <Path
        d="M469.333 426.667H320v-21.334h128V248.23l5-5.948c10.219-12.177 16.333-35.125 16.333-50.281 0-47.052-57.416-85.333-128-85.333V85.333c82.344 0 149.334 47.855 149.334 106.667 0 19.177-7.323 47.323-21.334 64z"
        fill="#993b17"
      />
      <Ellipse
        cx={298.66667}
        cy={117.33333}
        rx={21.33333}
        ry={10.66667}
        fill="#a34e2d"
      />
      <Ellipse
        cx={362.66667}
        cy={138.66667}
        rx={21.33333}
        ry={10.66667}
        fill="#a34e2d"
      />
      <Ellipse
        cx={405.33333}
        cy={181.33333}
        rx={21.33333}
        ry={10.66667}
        fill="#a34e2d"
      />
      <Ellipse cx={448} cy={224} rx={21.33333} ry={10.66667} fill="#993b17" />
      <Circle cx={448} cy={405.33333} r={21.33333} fill="#993b17" />
      <Circle cx={330.66667} cy={309.33333} r={10.66667} fill="#993b17" />
      <Circle cx={384} cy={362.66667} r={21.33333} fill="#993b17" />
      <Circle cx={416} cy={266.66667} r={10.66667} fill="#993b17" />
      <Ellipse
        cx={362.66667}
        cy={245.33333}
        rx={21.33333}
        ry={10.66667}
        fill="#a34e2d"
      />
    </Svg>
  );
}
