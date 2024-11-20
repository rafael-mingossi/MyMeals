import React from 'react';

import {BackButton} from '../../BackButton/BackButton';
import {Box, BoxProps} from '../../Box/Box';
import {Text} from '../../Text/Text';
import {ScreenProps} from '../Screen';

type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  BoxProps;

export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  ...boxProps
}: Props) {
  if (!title && !HeaderComponent && !canGoBack) {
    return null;
  }

  const showBackLabel = !title && !HeaderComponent;
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      mb="s24"
      {...boxProps}>
      {canGoBack && <BackButton showBackLabel={showBackLabel} />}
      {HeaderComponent}
      {title && (
        <Text font="bold" preset="headingSmall">
          {title}
        </Text>
      )}
      {title && <Box width={20} />}
    </Box>
  );
}
