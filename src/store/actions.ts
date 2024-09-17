import {Program} from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../Anchor_IDL/asset_based';
import {getBalance, getWrappedAccount} from '../functions/solana/getBalances';
import {appStore} from './zustandStore';
import {produce} from 'immer';
import {DLT, NativeTransaction, Transaction} from '../types/account';
import {getPriceEur} from '../functions/prices/get_prices';
import {setTx} from '../functions/solana/setTx';

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
  const state = appStore.getState();
  appStore.setState(
    produce(state, draftState => {
      draftState.dlts[DLT.SOLANA].nativeBalance = fetchedNativeBalance;
      draftState.dlts[DLT.SOLANA].wrapperBalances[wrapper][mint].balance =
        fetchedBalance;
    }),
  );
}

export async function setNativeBalance(dlt: DLT, balance: bigint) {
  const state = appStore.getState();
  if (state.dlts[dlt].nativeBalance !== balance) {
    appStore.setState(
      produce(state, draftState => {
        draftState.dlts[dlt].nativeBalance = balance;
      }),
    );
  }
}

export async function setBalance(
  balance: bigint,
  wrapper: string,
  mint: string,
) {
  const state = appStore.getState();
  appStore.setState(
    produce(state, draftState => {
      draftState.dlts[DLT.SOLANA].wrapperBalances[wrapper][mint].balance =
        balance;
    }),
  );
}

export async function reloadAllBalancesSolana(program: Program<AssetBased>) {
  const state = appStore.getState();
  const dltState = state.dlts[DLT.SOLANA];

  const fetchedNativeBalance = await getBalance(
    program.provider.connection,
    dltState.generalAddresses.pubKey,
  );

  console.log('fetchedNativeBalance', fetchedNativeBalance);

  const wrapperBalances: Record<string, Record<string, bigint>> = {};

  for (const wrapper of Object.keys(dltState.wrappers)) {
    wrapperBalances[wrapper] = {};
    for (const mint of Object.keys(dltState.wrappers[wrapper].mints)) {
      const fetchedBalance = await getWrappedAccount(
        dltState.wrappers[wrapper].mints[mint].addresses.wrappedToken,
        program,
      );
      wrapperBalances[wrapper][mint] = fetchedBalance;
    }
  }

  // Create a new state object immutably
  const newState = produce(state, draftState => {
    draftState.dlts[DLT.SOLANA].nativeBalance = fetchedNativeBalance;
    for (const wrapper of Object.keys(wrapperBalances)) {
      for (const mint of Object.keys(wrapperBalances[wrapper])) {
        draftState.dlts[DLT.SOLANA].wrapperBalances[wrapper][mint].balance =
          wrapperBalances[wrapper][mint];
      }
    }
  });
  appStore.setState(newState);
}

export async function reloadAllBalancesAndTransactionsSolana(
  program: Program<AssetBased>,
) {
  const state = appStore.getState();
  const dltState = state.dlts[DLT.SOLANA];

  const fetchedNativeBalance = await getBalance(
    program.provider.connection,
    dltState.generalAddresses.pubKey,
  );

  console.log('fetchedNativeBalance', fetchedNativeBalance);

  const wrapperBalances: Record<string, Record<string, bigint>> = {};
  const transactions: (Transaction | NativeTransaction)[] = [];

  for (const wrapper of Object.keys(dltState.wrappers)) {
    wrapperBalances[wrapper] = {};
    for (const mint of Object.keys(dltState.wrappers[wrapper].mints)) {
      const fetchedBalance = await getWrappedAccount(
        dltState.wrappers[wrapper].mints[mint].addresses.wrappedToken,
        program,
      );
      if (dltState.wrapperBalances[wrapper][mint].balance !== fetchedBalance) {
        wrapperBalances[wrapper][mint] = fetchedBalance;
        await setTx(
          dltState.transactions,
          (tx: Transaction | NativeTransaction) => transactions.push(tx),
          program,
          dltState.generalAddresses.pubKey,
          wrapper,
          mint,
          dltState.wrappers[wrapper].mints[mint],
        );
        console.log('transactions added', transactions);
      }
    }
  }

  // Create a new state object immutably
  const newState = produce(state, draftState => {
    draftState.dlts[DLT.SOLANA].nativeBalance = fetchedNativeBalance;
    draftState.dlts[DLT.SOLANA].transactions.push(...transactions);
    for (const wrapper of Object.keys(wrapperBalances)) {
      for (const mint of Object.keys(wrapperBalances[wrapper])) {
        draftState.dlts[DLT.SOLANA].wrapperBalances[wrapper][mint].balance =
          wrapperBalances[wrapper][mint];
      }
    }
  });
  appStore.setState(newState);
}

export function getSetTransaction(dlt: DLT) {
  return (transaction: Transaction | NativeTransaction) =>
    appStore.setState(state =>
      produce(state, draftState => {
        if (
          state.dlts[dlt].transactions.filter(
            tx => tx.txSig === transaction.txSig,
          ).length === 0
        ) {
          draftState.dlts[dlt].transactions.push(transaction);
        }
      }),
    );
}

export function deleteTransactions(dlt: DLT) {
  return appStore.setState(state =>
    produce(state, draftState => {
      draftState.dlts[dlt].transactions = [];
    }),
  );
}

export async function fetchPrice(dlt: DLT, mint: string) {
  const state = appStore.getState();

  const price = await getPriceEur(dlt, mint);

  appStore.setState(
    produce(state, draftState => {
      draftState.dlts[dlt].prices[mint] = price;
    }),
  );
}
