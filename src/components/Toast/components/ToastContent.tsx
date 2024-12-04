import React from 'react';
import {Dimensions} from 'react-native';

import {Toast, ToastType, ToastPosition} from '@services';

import {$shadowProps} from '@theme';

import {Box, BoxProps} from '../../Box/Box';
import {Icon, IconProps} from '../../Icon/Icon';
import {Text} from '../../Text/Text';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

interface Props {
  toast: Toast;
}

export function ToastContent({toast}: Props) {
  const position: Required<ToastPosition> = toast?.position || 'top';
  const type: ToastType = toast.type || 'success';

  return (
    <Box {...$boxStyle} style={[{[position]: 100}, $shadowProps]}>
      <Icon {...mapTypeToIcon[type]} />
      <Text preset="paragraphMedium" font="bold" style={{flexShrink: 1}}>
        {toast?.message}
      </Text>
    </Box>
  );
}

const mapTypeToIcon: Record<ToastType, IconProps> = {
  success: {
    color: 'success',
    name: 'checkRound',
  },
  error: {
    color: 'error',
    name: 'errorRound',
  },
};

const $boxStyle: BoxProps = {
  backgroundColor: 'background',
  position: 'absolute',
  padding: 's16',
  borderRadius: 's16',
  columnGap: 's16',
  alignItems: 'center',
  alignSelf: 'center',
  flexDirection: 'row',
  opacity: 0.95,
  maxWidth: MAX_WIDTH,
};
