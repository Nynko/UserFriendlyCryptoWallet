import {Program} from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import * as anchor from '@coral-xyz/anchor';

export async function getBalance(
  connection: anchor.web3.Connection,
  wallet: anchor.web3.PublicKey,
): Promise<bigint> {
  // Should be BigInt :https://github.com/solana-labs/solana-web3.js/issues/1116
  let balance = await connection.getBalance(wallet);
  return BigInt(balance);
}

export async function getMinimumRent(
  dataSize: number,
  connection: anchor.web3.Connection,
): Promise<number> {
  return (
    (await connection.getMinimumBalanceForRentExemption(dataSize)) /
    anchor.web3.LAMPORTS_PER_SOL
  );
}

export async function getWrappedAccount(
  wrappedAccount: anchor.web3.PublicKey,
  program: Program<AssetBased>,
) {
  const fetchedAccount =
    await program.provider.connection.getTokenAccountBalance(wrappedAccount);

  return BigInt(fetchedAccount.value.amount);
}
