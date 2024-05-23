import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {Program} from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import IDL from '../Anchor_IDL/handmade_naive.json';
import {SetStateAction, useEffect, useState} from 'react';
import {ENV, ISSUER_LOCAL, ISSUER_DEVNET} from '../tmp';
import {useConnection} from '@solana/wallet-adapter-react';
import {create_account} from '../functions/acccount_creation';

export const TestCreateAccount = () => {
  const connection = useConnection().connection;

  return (
    <View>
      <Text>Test Transfer to address</Text>
      <Button
        title={'connect'}
        onPress={() => create_account(connection)}></Button>
    </View>
  );
};
