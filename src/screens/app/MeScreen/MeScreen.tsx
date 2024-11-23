import React from 'react';

import {useAuthSignOut} from '@domain';

import {Button, Screen, Text} from '@components';

export function MeScreen() {
  const {isLoading, signOut} = useAuthSignOut({
    onSuccess: () => console.log('SIGN OUT COMPLETE'),
  });
  return (
    <Screen>
      <Text>ME</Text>
      <Button title={'Log out'} disabled={isLoading} onPress={signOut} />
    </Screen>
  );
}
