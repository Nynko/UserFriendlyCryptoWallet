import {
  DLT,
  DltAccount,
  GeneralAddresses,
  Mint,
  MintBalance,
  TransactionType,
  WrapperBalances,
  Wrappers,
} from '../types/account';
import {appStore} from './zustandStore';
import {useShallow} from 'zustand/react/shallow';

export function useIsStoreInitialized() {
  return appStore(useShallow(state => state.initialized));
}

export function useTransactions(dlt: DLT) {
  return appStore(useShallow(state => state.dlts[dlt].transactions));
}

export function useMintTransactions(dlt: DLT, wrapper: string, mint: string) {
  return appStore(state =>
    state.dlts[dlt].transactions.filter(
      tx =>
        tx.discriminator === TransactionType.Transaction &&
        tx.mint.toBase58() === mint &&
        tx.wrapper.toBase58() === wrapper,
    ),
  );
}

export function useDltAccounts(): Record<DLT, DltAccount> {
  return appStore(state => state.dlts);
}

export function useDltAccount(dlt: DLT): DltAccount {
  return appStore(state => state.dlts[dlt]);
}

export function useDltAccountAddresses(dlt: DLT): {
  generalAddresses: GeneralAddresses;
  wrappers: Record<string, Wrappers>;
} {
  return appStore(
    useShallow(state => {
      return {
        generalAddresses: state.dlts[dlt].generalAddresses,
        wrappers: state.dlts[dlt].wrappers,
      };
    }),
  );
}

export function useDltAccountBalances(
  dlt: DLT,
): Record<string, WrapperBalances> {
  return appStore(state => state.dlts[dlt].wrapperBalances);
}

export function useMintAddresses(
  dlt: DLT,
  wrapper: string,
  mint: string,
): Mint {
  return appStore(state => state.dlts[dlt].wrappers[wrapper].mints[mint]);
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

export function useMintDecimals(dlt: DLT, wrapper: string, mint: string) {
  return appStore(
    state => state.dlts[dlt].wrapperBalances[wrapper][mint].decimals,
  );
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

export function usePrice(dlt: DLT, mint: string) {
  return appStore(state => state.dlts[dlt].prices[mint]);
}
