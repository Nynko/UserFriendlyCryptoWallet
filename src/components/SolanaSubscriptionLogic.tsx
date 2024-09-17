import {useEffect} from 'react';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {useDltAccountAddresses} from '../store/selectors';
import {
  getSetTransaction,
  setBalance,
  setNativeBalance,
} from '../store/actions';
import {DLT} from '../types/account';
import {setTx} from '../functions/solana/setTx';
import {appStore} from '../store/zustandStore';

let counter = 0;

export function SolanaSubscriptionLogic() {
  counter++;
  console.log('SolanaSubscriptionLogic counter', counter);

  const program = useAnchorProgram().program;
  const account = useDltAccountAddresses(DLT.SOLANA);
  const transactions = appStore.getState().dlts[DLT.SOLANA].transactions; // This won't trigger a re-render
  const setTransactions = getSetTransaction(DLT.SOLANA);

  useEffect(() => {
    const subIds: number[] = [];

    // For the native account
    const subscriptionIdNative = program.provider.connection.onAccountChange(
      account.generalAddresses.pubKey,
      // callback for when the account changes
      accountInfo => {
        setNativeBalance(DLT.SOLANA, BigInt(accountInfo.lamports));
      },
    );
    console.log('Connected with subscriptionIdNative: ', subscriptionIdNative);

    subIds.push(subscriptionIdNative);

    for (const [wrapperAddress, wrapper] of Object.entries(account.wrappers)) {
      for (const [mintAddress, mint] of Object.entries(wrapper.mints)) {
        const subscriptionId = program.provider.connection.onAccountChange(
          mint.addresses.wrappedToken,
          // callback for when the account changes
          accountInfo => {
            console.log(
              'Account data changed:',
              accountInfo.data.subarray(64, 64 + 8),
            );
            const byteArray = accountInfo.data.subarray(64, 64 + 8);

            // Create an ArrayBuffer from the subarray
            const buffer = new ArrayBuffer(8);
            const uint8Array = new Uint8Array(buffer);
            uint8Array.set(byteArray);

            // Use DataView to read the 8 bytes as a number
            const dataView = new DataView(buffer);
            const number = dataView.getBigUint64(0, true); // true for little-endian, false for big-endian

            setBalance(number, wrapperAddress, mintAddress);
            setTx(
              transactions,
              setTransactions,
              program,
              account.generalAddresses.pubKey,
              wrapperAddress,
              mintAddress,
              mint,
            );
          },
        );
        console.log(
          `Connected for wrapper: ${wrapper.wrapperName} and ${mint.name}: `,
          subscriptionId,
        );
        subIds.push(subscriptionId);
      }
    }

    return () => {
      for (const subId of subIds) {
        program.provider.connection.removeAccountChangeListener(subId);
      }
    };
  }, [
    account.generalAddresses.pubKey,
    account.wrappers,
    program,
    setTransactions,
    transactions,
  ]);

  return <></>;
}
