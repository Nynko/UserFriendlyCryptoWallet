import {createContext, useContext} from 'react';
import {DLT} from '../../types/account';

export interface BalancesDispatchContextState {
  dltDispatch: Record<DLT, DltBalancesDispatchContextState>;
  reloadAllBalances: () => Promise<void>;
}

type WrapperAddress = string;

export interface DltBalancesDispatchContextState {
  wrappers: Record<WrapperAddress, BalancesDispatchMint>;
  reloadNativeBalance: () => Promise<void>;
}

/** Mint address as key */
export type BalancesDispatchMint = Record<string, Mint>;

export interface Mint {
  reloadBalance: () => Promise<void>;
}

export const BalancesDispatchContext =
  createContext<BalancesDispatchContextState>(
    {} as BalancesDispatchContextState,
  );

export function useBalancesDispatch(): BalancesDispatchContextState {
  return useContext(BalancesDispatchContext);
}
