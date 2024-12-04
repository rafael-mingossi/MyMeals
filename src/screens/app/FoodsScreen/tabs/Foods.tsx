import React from 'react';

import {useGetFoodsByUser} from '@domain';
import {useAuthCredentials} from '@services';

import {ActivityIndicator, Box, Text} from '@components';

export function Foods() {
  const {authCredentials} = useAuthCredentials();

  const {foods, isLoading} = useGetFoodsByUser(
    authCredentials?.session.user.id as string,
  );
  console.log(foods);
  return (
    <Box>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        foods.map(item => <Text key={item.id}>{item.label}</Text>)
      )}
    </Box>
  );
}
