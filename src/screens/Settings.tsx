import {SafeAreaView, View} from 'react-native';
import NewModuleButton from '../components/ios/NewModuleButton';
import {mainStyle} from '../../styles/style';
import {appStore} from '../store/zustandStore';
import NFC from '../components/TestNFC';
import {Button, XStack, YStack} from 'tamagui';
import {deleteTransactions} from '../store/actions';
import {DLT} from '../types/account';
import {NATIVE_MINT, WRAPPER_PDA} from '../const';
import {produce} from 'immer';
import {getWrappedTokenAddress} from '../functions/solana/getDerivedAddresses';
import * as anchor from '@coral-xyz/anchor';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Settings() {
  const account = appStore(
    state => state.dlts[DLT.SOLANA].generalAddresses.pubKey,
  );

  const program = useAnchorProgram().program;
  return (
    <SafeAreaView style={mainStyle.safeArea}>
      <NewModuleButton />
      <YStack padding="$3" gap="$3">
        <Button
          onPress={() => {
            const init = appStore.getInitialState();
            appStore.setState(init);
          }}>
          Delete Account
        </Button>
        <XStack gap="$2">
          <Button size="$6" theme="blue">
            Hello world
          </Button>
        </XStack>
        <XStack gap="$2">
          <Button
            size="$6"
            theme="blue"
            onPress={() => deleteTransactions(DLT.SOLANA)}>
            Delete Transactions
          </Button>
        </XStack>
        <XStack gap="$2">
          <Button
            size="$6"
            theme="blue"
            onPress={() => {
              const wrappedToken = getWrappedTokenAddress(
                NATIVE_MINT,
                new anchor.web3.PublicKey(WRAPPER_PDA),
                account,
                program,
              );
              appStore.setState(state =>
                produce(state, draft => {
                  draft.dlts[DLT.SOLANA].wrappers[WRAPPER_PDA].mints[
                    NATIVE_MINT.toBase58()
                  ] = {
                    name: 'SOL',
                    addresses: {
                      wrappedToken: wrappedToken,
                      mintAddress: NATIVE_MINT,
                      mintMetadata: anchor.web3.PublicKey.default,
                    },
                  };
                  draft.dlts[DLT.SOLANA].wrapperBalances[WRAPPER_PDA][
                    NATIVE_MINT.toBase58()
                  ] = {
                    decimals: 9,
                    balance: 0n,
                  };
                }),
              );
            }}>
            Add mint
          </Button>
        </XStack>
      </YStack>
      <View style={mainStyle.centered}>
        <NFC />
      </View>
    </SafeAreaView>
  );
}
