import React, {ReactElement} from 'react';
import {Linking, Platform} from 'react-native';

import {PermissionName, usePermission} from '@services';

import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';
import {Box} from '../Box/Box';
import {Button} from '../Button/Button';
import {Screen} from '../Screen/Screen';
import {Text, TextProps} from '../Text/Text';

interface PermissionsManagerProps {
  permissionName: PermissionName;
  description: string;
  children: ReactElement;
}

export function PermissionManager({
  permissionName,
  description,
  children,
}: PermissionsManagerProps) {
  const {status, isLoading} = usePermission(permissionName);

  if (status === 'granted') {
    return children;
  }

  return (
    <Screen flex={1} canGoBack>
      <Box justifyContent="center" alignItems="center">
        <Text preset="headingSmall" textAlign="center">
          {description}
        </Text>
        {isLoading && <ActivityIndicator color="primary" />}
        {status === 'unavailable' && (
          <Text {...$messageStyle}>
            Camera is not available for this device
          </Text>
        )}
        {status === 'never_ask_again' && (
          <Box>
            {Platform.OS === 'android' && (
              <Text {...$messageStyle}>
                Re-open your app to activate permissions
              </Text>
            )}
            <Button
              title="Open Configs"
              mt="s16"
              onPress={Linking.openSettings}
            />
          </Box>
        )}
      </Box>
    </Screen>
  );
}

const $messageStyle: TextProps = {
  preset: 'paragraphMedium',
  color: 'error',
  marginVertical: 's16',
  textAlign: 'center',
  font: 'semiBold',
};
