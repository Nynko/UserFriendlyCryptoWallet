import {useEffect} from 'react';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {useDltAccount, useTransactions} from '../store/selectors';
import {getSetTransaction, setBalance} from '../store/actions';
import {DLT, TransactionType} from '../types/account';
import {parseSolanaTransaction} from '../functions/solana/parseTransaction';
import {sortSignatures} from '../functions/solana/utils';

export function SolanaSubscriptionLogic() {
  const program = useAnchorProgram().program;
  const account = useDltAccount(DLT.SOLANA);
  const transactions = useTransactions(DLT.SOLANA);
  const setTransactions = getSetTransaction(DLT.SOLANA);
  useEffect(() => {
    const subIds: number[] = [];
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

            // Get related transactions
            const filteredTxs = transactions.filter(
              tx =>
                tx.discriminator === TransactionType.Transaction &&
                tx.wrapper?.toBase58() === wrapperAddress &&
                tx.mint?.toBase58() === mintAddress,
            );
            const lastSig =
              filteredTxs.length !== 0
                ? filteredTxs[filteredTxs.length - 1].txSig
                : undefined;
            program.provider.connection
              .getSignaturesForAddress(mint.addresses.wrappedToken, {
                until: lastSig,
              })
              .then(signatures => {
                const sortedSignatures = signatures.sort(sortSignatures);
                const setTxs = async () => {
                  for (const sig of sortedSignatures) {
                    await program.provider.connection
                      .getTransaction(sig.signature, {
                        commitment: 'confirmed',
                      })
                      .then(tx => {
                        if (tx) {
                          const transaction = parseSolanaTransaction(
                            sig.signature,
                            account.generalAddresses.pubKey,
                            tx,
                          );
                          if (transaction) {
                            setTransactions(transaction);
                          }
                        }
                      });
                  }
                };
                setTxs();
              });
          },
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
