import {TextProps} from '@components';
import {ThemeColours} from '@theme';

import {TouchableOpacityBoxProps} from '../Box/Box.tsx';

import {ButtonFloatPreset} from './ButtonFloat.tsx';

interface ButtonFloatUI {
  container: TouchableOpacityBoxProps;
  content: {colour: ThemeColours; textProps?: TextProps};
}

export const buttonFloatPresets: Record<
  ButtonFloatPreset,
  {
    default: ButtonFloatUI;
    disabled: ButtonFloatUI;
  }
> = {
  icon: {
    default: {
      container: {
        backgroundColor: 'bluePrimary',
        padding: 's16',
        style: {
          position: 'absolute',
          bottom: 20,
          right: 10,
        },
      },
      content: {
        colour: 'red',
      },
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: {colour: 'gray2'},
    },
  },
  main: {
    default: {
      container: {
        backgroundColor: 'bluePrimary',
        padding: 's16',
        style: {
          position: 'absolute',
          bottom: 45,
          right: 20,
        },
      },
      content: {
        colour: 'red',
      },
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: {colour: 'gray2'},
    },
  },
  secondary: {
    default: {
      container: {
        backgroundColor: 'bluePrimary',
        padding: 's8',
        style: {
          position: 'absolute',
          bottom: 105,
          right: 20,
        },
      },
      content: {
        colour: 'red',
      },
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: {colour: 'gray2'},
    },
  },
};
