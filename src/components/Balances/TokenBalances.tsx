import React from 'react';
import {Text} from 'react-native';
import {useMintBalance} from '../../store/selectors';
import {DLT} from '../../types/account';

export const TokenBalance = React.memo(
  ({
    wrapperAddress,
    mintAddress,
    dlt,
  }: {
    wrapperAddress: string;
    mintAddress: string;
    dlt: DLT;
  }) => {
    const balance = useMintBalance(dlt, wrapperAddress, mintAddress);
    const value = Number(balance.balance) / 10 ** balance.decimals;

    return (
      <>
        <Text>{value.toFixed(balance.decimals)}</Text>
      </>
    );
  },
);
