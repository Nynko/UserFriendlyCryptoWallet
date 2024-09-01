import {Button, SafeAreaView} from 'react-native';
import {useAccount, useAccountDispatch} from '../hooks/contexts/useAccount';
import NewModuleButton from '../components/ios/NewModuleButton';
import {DLT} from '../types/account';
import {useMMKV} from 'react-native-mmkv';
import {mainStyle} from '../../styles/style';
import * as anchor from '@coral-xyz/anchor';
import {useStore} from '../store/zustandStore';

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Settings() {
  const mmkv = useMMKV();
  const account = useAccount();
  const accountDispatch = useAccountDispatch();
  return (
    <SafeAreaView style={mainStyle.safeArea}>
      <NewModuleButton />
      <Button
        title="Test"
        onPress={() => {
          console.log('Test');
          const newPublicKey =
            account.dltAccounts[DLT.SOLANA].generalAddresses.pubKey;
          console.log(newPublicKey);

          // console.log(newPublicKey);
          // console.log(newPublicKey.toJSON());
          const superjson = require('superjson');
          const serialized = superjson.serialize({truc: {pk: newPublicKey}});
          console.log(serialized);
          const deserialized: {truc: {pk: anchor.web3.PublicKey}} =
            superjson.deserialize(serialized);
          console.log(deserialized);
          console.log(deserialized.truc.pk.equals(newPublicKey));
          console.log(deserialized.truc.pk.toBase58());
        }}
      />
      <Button
        title="Delete Account"
        onPress={() => {
          mmkv.delete(DLT.SOLANA);
          const init = useStore.getInitialState();
          useStore.setState(init);
          accountDispatch.updateDltAccount(
            account.dltAccounts[DLT.SOLANA],
            DLT.SOLANA,
            {
              dltAccounts: {} as any,
            },
          );
        }}
      />
    </SafeAreaView>
  );
}
