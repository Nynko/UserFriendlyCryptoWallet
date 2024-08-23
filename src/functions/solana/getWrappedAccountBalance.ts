import * as anchor from '@coral-xyz/anchor';
import {Program} from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';

export async function getWrappedAccount(
  wrappedAccount: anchor.web3.PublicKey,
  program: Program<AssetBased>,
) {
  const fetchedAccount =
    await program.provider.connection.getTokenAccountBalance(wrappedAccount);

  return Number(fetchedAccount.value.amount);
}
