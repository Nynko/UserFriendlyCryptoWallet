import * as anchor from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import {Program} from '@coral-xyz/anchor';

export async function getWrappedAccount(
  wrappedAccount: anchor.web3.PublicKey,
  program: Program<HandmadeNaive>,
) {
  const fetchedAccount = await program.account.wrappedTokenAccount.fetch(
    wrappedAccount,
  );

  return fetchedAccount;
}
