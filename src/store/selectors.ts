import {DLT, DltAccount, MintBalance, WrapperBalances} from '../types/account';
import {appStore} from './zustandStore';

export function useIsStoreInitialized() {
  return appStore(state => state.initialized);
}

export function useTransactions(dlt: DLT) {
  return appStore(state => state.dlts[dlt].transactions);
}

export function useMintTransactions(dlt: DLT, wrapper: string, mint: string) {
  return appStore(state =>
    state.dlts[dlt].transactions.filter(
      tx => tx.mint?.toBase58() === mint && tx.wrapper?.toBase58() === wrapper,
    ),
  );
}

export function useDltAccounts(): Record<DLT, DltAccount> {
  return appStore(state => state.dlts);
}

export function useDltAccount(dlt: DLT): DltAccount {
  return appStore(state => state.dlts[dlt]);
}

export function useDltAccountAddresses(
  dlt: DLT,
): Record<string, WrapperBalances> {
  return appStore(state => state.dlts[dlt].wrapperBalances);
}

export function useWrapperBalances(
  dlt: DLT,
  wrapper: string,
): Record<string, MintBalance> {
  return appStore(state => state.dlts[dlt].wrapperBalances[wrapper]);
}

export function useMintBalance(
  dlt: DLT,
  wrapper: string,
  mint: string,
): MintBalance {
  return appStore(state => state.dlts[dlt].wrapperBalances[wrapper][mint]);
}

export function useNativeBalance(dlt: DLT) {
  return appStore(state => state.dlts[dlt].nativeBalance);
}

export function usePseudos() {
  return appStore(state => state.knownPseudos);
}

export function useAccountPseudo(dlt: DLT) {
  return appStore(state => state.dlts[dlt].pseudo);
}
