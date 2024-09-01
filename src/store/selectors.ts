import {DLT, DltAccount, MintBalance, WrapperBalances} from '../types/account';
import {useAppStore} from './zustandStore';

export function useTransactions() {
  return useAppStore(state => state.dlts.solana.transactions);
}

export function useDltAccounts(): Record<DLT, DltAccount> {
  return useAppStore(state => state.dlts);
}

export function useDltAccount(dlt: DLT): DltAccount {
  return useAppStore(state => state.dlts[dlt]);
}

export function useDltAccountAddresses(
  dlt: DLT,
): Record<string, WrapperBalances> {
  return useAppStore(state => state.dlts[dlt].wrapperBalances);
}

export function useWrapperBalances(
  dlt: DLT,
  wrapper: string,
): Record<string, MintBalance> {
  return useAppStore(state => state.dlts[dlt].wrapperBalances[wrapper]);
}

export function useMintBalance(
  dlt: DLT,
  wrapper: string,
  mint: string,
): MintBalance {
  return useAppStore(state => state.dlts[dlt].wrapperBalances[wrapper][mint]);
}
