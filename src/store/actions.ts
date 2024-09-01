import {Program} from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../Anchor_IDL/asset_based';
import {getBalance, getWrappedAccount} from '../functions/solana/getBalances';
import {appStore} from './zustandStore';
import {produce} from 'immer';
import {DLT} from '../types/account';

export async function reloadBalanceSolana(
  wrappedAccount: anchor.web3.PublicKey,
  wrapper: string,
  mint: string,
  pubkey: anchor.web3.PublicKey,
  program: Program<AssetBased>,
) {
  const fetchedBalance = await getWrappedAccount(wrappedAccount, program);
  const fetchedNativeBalance = await getBalance(
    program.provider.connection,
    pubkey,
  );

  appStore.setState(state =>
    produce(state, draftState => {
      draftState.dlts[DLT.SOLANA].nativeBalance = fetchedNativeBalance;
      draftState.dlts[DLT.SOLANA].wrapperBalances[wrapper][mint].balance =
        fetchedBalance;
    }),
  );
}

export async function reloadAllBalancesSolana(program: Program<AssetBased>) {
  const newState = appStore(state => state.dlts[DLT.SOLANA]);

  const fetchedNativeBalance = await getBalance(
    program.provider.connection,
    newState.generalAddresses.pubKey,
  );

  newState.nativeBalance = fetchedNativeBalance;

  for (const wrapper of Object.keys(newState.wrappers)) {
    for (const mint of Object.keys(newState.wrappers[wrapper])) {
      const fetchedBalance = await getWrappedAccount(
        newState.wrappers[wrapper].mints[mint].addresses.wrappedToken,
        program,
      );
      newState.wrapperBalances[wrapper][mint].balance = fetchedBalance;
    }
  }

  appStore.setState(state =>
    produce(state, draftState => {
      draftState.dlts[DLT.SOLANA] = newState;
    }),
  );
}
