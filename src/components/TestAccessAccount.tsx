import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {accessAddress} from '../functions/solana_wallet';

export const TestAccessAccount = () => {
  const mint = new anchor.web3.PublicKey(
    'BCEkAUyM6NZtoorWn4n7b5pk7aN4haJAqifUEQQ8Ut8W',
  );
  return (
    <View>
      <Text>Test Access Account</Text>
      <Button
        title={'connect'}
        onPress={async () => {
          let wrappedToken = await accessAddress(
            'WrappedAccount' + mint.toString(),
          );
          console.log('WrappedAccount', wrappedToken.toString());
          let idendity = await accessAddress('Idendity');
          console.log('Idendity', idendity.toString());

          let twoAuth = await accessAddress(
            'TwoAuth' + wrappedToken.toString(),
          );
          console.log('TwoAuth', twoAuth.toString());
        }}></Button>
    </View>
  );
};
