import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {accessWrappedToken} from '../functions/solana_wallet';

export const TestAccessAccount = () => {
  const mint = new anchor.web3.PublicKey(
    'DufKxDjrHcfw7cuh2x8CNrYz9GMHXiLAuYFmvtHc6jbE',
  );
  return (
    <View>
      <Text>Test Access Account</Text>
      <Button
        title={'connect'}
        onPress={async () => {
          let account = await accessWrappedToken(mint);
          console.log(account.toString());
        }}></Button>
    </View>
  );
};
