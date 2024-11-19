import {TextProps} from '@components';
import {ThemeColours} from '@theme';

import {TouchableOpacityBoxProps} from '../Box/Box.tsx';

import {ButtonPreset} from './Button.tsx';

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: {colour: ThemeColours; textProps?: TextProps};
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: {colour: 'primaryContrast'},
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: {colour: 'gray2'},
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: {colour: 'primary'},
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: {colour: 'gray2'},
    },
  },
};
