import React from 'react';
import {Modal as RNModal, ModalProps as RNModalProps} from 'react-native';

import {Box, PressableBox} from '@components';

interface ModalCustomProps extends Omit<RNModalProps, 'children'> {
  children: React.ReactNode;
  onClose: () => void;
}

export function ModalCustom({
  children,
  onClose,
  ...modalProps
}: ModalCustomProps) {
  return (
    <RNModal
      transparent
      statusBarTranslucent
      animationType="fade"
      {...modalProps}>
      <PressableBox onPress={onClose} flex={1}>
        <Box flex={1} backgroundColor="backgroundContrast" opacity={0.3} />
      </PressableBox>

      <Box
        position={'absolute'}
        bottom={250}
        left={0}
        right={0}
        paddingVertical="s16"
        marginHorizontal="s16"
        backgroundColor="backgroundInner"
        borderRadius="s16">
        {children}
      </Box>
    </RNModal>
  );
}
