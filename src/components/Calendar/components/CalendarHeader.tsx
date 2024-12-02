import React from 'react';

import {Box, Text} from '@components';

interface CalendarHeaderProps {
  month?: string;
}

export function CalendarHeader({month}: CalendarHeaderProps) {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingBottom="s10"
      marginBottom="s10"
      borderBottomWidth={0.5}
      borderBottomColor="borderGray">
      <Text preset="headingMedium" color="paragraph">
        {month}
      </Text>
    </Box>
  );
}
