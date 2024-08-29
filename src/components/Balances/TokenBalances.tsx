import React from 'react';
import {Text} from 'react-native';

export const TokenBalance = React.memo(({balance}: {balance: number}) => {
  return (
    <>
      <Text>{balance}</Text>
    </>
  );
});
