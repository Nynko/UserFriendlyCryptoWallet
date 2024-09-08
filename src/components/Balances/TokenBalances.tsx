import React from 'react';
import {Text, View} from 'react-native';
import {useMintBalance} from '../../store/selectors';
import {DLT} from '../../types/account';
import {mainStyle} from '../../../styles/style';

export const TokenBalance = React.memo(
  ({
    wrapperAddress,
    mintAddress,
    mintName,
    dlt,
  }: {
    wrapperAddress: string;
    mintAddress: string;
    mintName: string;
    dlt: DLT;
  }) => {
    const balance = useMintBalance(dlt, wrapperAddress, mintAddress);
    const value = Number(balance.balance) / 10 ** balance.decimals;
    console.log('Rendering TokenBalance component');
    return (
      <View style={mainStyle.innerContainer} key={mintAddress}>
        <Text>{mintName}</Text>
        <Text>{value.toFixed(balance.decimals)}</Text>
      </View>
    );
  },
);
