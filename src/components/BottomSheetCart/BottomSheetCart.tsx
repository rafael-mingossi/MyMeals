import React from 'react';

import ActionSheet, {SheetProps} from 'react-native-actions-sheet';

import {Text} from '@components';

export function BottomSheetCart(props: SheetProps) {
  return (
    <ActionSheet {...props}>
      <Text>Cart Content</Text>
    </ActionSheet>
  );
}
