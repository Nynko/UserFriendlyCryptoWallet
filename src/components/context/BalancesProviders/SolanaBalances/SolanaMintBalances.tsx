import React, {Dispatch, SetStateAction, type FC} from 'react';
import {web3} from '@coral-xyz/anchor';
import {Text} from 'react-native';
import {DltBalancesContextState} from '../../../../hooks/contexts/useBalances';

export const SolanaMintBalances: FC<{
  mint: web3.PublicKey;
  setWrappers: Dispatch<SetStateAction<DltBalancesContextState>>;
}> = React.memo(({mint}) => {
  return (
    <>
      <Text>{mint.toBase58()}</Text>
    </>
  );
});
