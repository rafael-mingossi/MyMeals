import * as React from 'react';

import Svg, {Path, Circle} from 'react-native-svg';

import {IconBase} from '@components';

export function FishIcon({size = 40}: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Path
        d="M21.333 405.333s10.667-32 42.667-64S181.333 288 213.333 256L256 298.667s-42.667 64-106.667 64-106.666 21.333-128 42.666z"
        fill="#c82e25"
      />
      <Path
        d="M56.625 381.333l-9.146-19.27c29-13.76 63.271-20.73 101.854-20.73 40.76 0 72.51-33.843 84.271-48.396l16.583 13.417c-13.677 16.927-50.895 56.313-100.854 56.313-35.406 0-66.593 6.28-92.708 18.666z"
        fill="#c11107"
      />
      <Path
        d="M234.667 192L192 234.667C170.667 256 128 256 128 256c-42.667 0-106.667 21.333-106.667 64 0 0 21.334-21.333 85.334-21.333s106.666 0 128-21.334l42.666-42.666z"
        fill="#c82e25"
      />
      <Path
        d="M45.26 307.323l-6.895-20.188c19.02-6.5 42-9.802 68.302-9.802 56.791 0 97.833 0 112.916-15.083l35.125-35.125 15.084 15.083-35.125 35.125c-21.334 21.334-63.771 21.334-128 21.334-23.948 0-44.605 2.916-61.407 8.656z"
        fill="#c11107"
      />
      <Path
        d="M320 277.333L277.333 320C256 341.333 256 384 256 384c0 42.667-21.333 106.667-64 106.667 0 0 21.333-21.334 21.333-85.334s0-106.666 21.334-128l42.666-42.666z"
        fill="#c82e25"
      />
      <Path
        d="M222 478.031l-14.458-15.687c15.468-14.24 27.125-47.917 27.125-78.344 0-5.27.77-52.27 27.583-79.083l35.125-35.125 15.083 15.083L277.333 320C256.24 341.094 256 383.573 256 384c0 31.167-11.677 73.48-34 94.031z"
        fill="#c11107"
      />
      <Path
        d="M234.667 256c-42.667 0-85.334 21.333-85.334 85.333s-42.666 64-42.666 64c-42.667 0-85.334 21.334-85.334 85.334 0 0 21.334-42.667 64-42.667s128 0 128-85.333c0-64 64-64 64-64z"
        fill="#cd3e36"
      />
      <Path
        d="M45.27 462.25l-13.103-16.833c16-12.448 33.885-18.75 53.166-18.75 67.552 0 106.667-10.47 106.667-64 0-58.01 41.927-76.386 59.948-81.594l5.917 20.5c-16.625 4.802-44.532 19.125-44.532 61.094 0 85.333-83.27 85.333-128 85.333-14.416 0-27.906 4.792-40.062 14.25zM362.667 21.333s-21.334 0-21.334 21.334v106.666l21.334 21.334h106.666c21.334 0 21.334-21.334 21.334-21.334v-128z"
        fill="#c82e25"
      />
      <Path
        d="M469.333 170.667H448v-21.334h21.333V32h21.334v117.333c-.334 13.073-8.709 21.334-21.334 21.334z"
        fill="#c11107"
      />
      <Path
        d="M490.664 21.336L490.667 21.336 490.667 21.333 490.664 21.336z"
        fill="#c82e25"
      />
      <Path
        d="M192 213.333A106.667 106.667 0 00298.667 320c170.666-170.667 192-298.667 192-298.667s-128 21.334-298.667 192z"
        fill="#d2514a"
      />
      <Path
        d="M232.323 252l-16.656-13.333c3.541-4.417 87.77-108.896 194.843-173.146l10.98 18.291C317.77 146.042 233.167 250.948 232.323 252z"
        fill="#d96c66"
      />
      <Path
        d="M305.98 173.594l-14.647-15.5c18.282-17.281 36.75-33.334 54.886-47.709l13.25 16.73c-17.656 13.979-35.656 29.625-53.49 46.479z"
        fill="#e59b96"
      />
      <Path
        d="M298.583 320.104l-4.729-.208a106.283 106.283 0 01-70.573-31.177l15.084-15.084a85.027 85.027 0 0051.833 24.615C414.146 172.187 454.146 70.958 465.635 33.062l20.417 6.188C474 79.02 431.927 185.677 301.906 316.75z"
        fill="#cd3e36"
      />
      <Path
        d="M245.333 234.667v-21.334a32.035 32.035 0 0032-32h21.334a53.396 53.396 0 01-53.334 53.334z"
        fill="#cd3e36"
      />
      <Circle cx={245.33333} cy={181.33333} r={32} fill="#2b1718" />
      <Circle cx={266.66667} cy={181.33333} r={10.66667} fill="#afa8a8" />
      <Circle cx={330.66667} cy={266.66667} r={32} fill="#2b1718" />
      <Circle cx={352} cy={266.66667} r={10.66667} fill="#afa8a8" />
    </Svg>
  );
}