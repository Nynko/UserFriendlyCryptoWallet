import {Program} from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import {
  Mint,
  NativeTransaction,
  Transaction,
  TransactionType,
} from '../../types/account';
import * as anchor from '@coral-xyz/anchor';
import {parseSolanaTransaction} from './parseTransaction';
import {sortSignatures} from './utils';

export async function setTx(
  transactions: (Transaction | NativeTransaction)[],
  setTransactions: (tx: Transaction | NativeTransaction) => void,
  program: Program<AssetBased>,
  pubkey: anchor.web3.PublicKey,
  wrapperAddress: string,
  mintAddress: string,
  mint: Mint,
) {
  // Get related transactions
  const filteredTxs = transactions.filter(
    tx =>
      tx.discriminator === TransactionType.Transaction &&
      tx.wrapper?.toBase58() === wrapperAddress &&
      tx.mint?.toBase58() === mintAddress,
  );
  // .sort((a, b) => a.timestamp - b.timestamp);
  console.log('filteredTxs', filteredTxs);
  const lastSig =
    filteredTxs.length !== 0
      ? filteredTxs[filteredTxs.length - 1].txSig
      : undefined;
  console.log('lastSig', lastSig);

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
                  pubkey,
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
}
