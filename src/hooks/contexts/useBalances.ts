import {Context, createContext, useContext} from 'react';
import {DLT} from '../../types/account';
import {TypedError} from '../../Errors/TypedError';
import {CodingErrors} from '../../Errors/CodingError';

export interface DltBalancesContextState {
  wrappers: Record<WrapperName, BalancesMint>;
  nativeBalance: number;
}

export type WrapperName = string;

/** Mint address as key */
export type BalancesMint = Record<string, Mint>;

export interface Mint {
  balance: number;
}

export const BalancesContexts = Object.values(DLT).reduce((acc, dlt) => {
  acc[dlt] = createContext<DltBalancesContextState>(
    {} as DltBalancesContextState,
  );
  return acc;
}, {} as Record<DLT, Context<DltBalancesContextState>>);

export function useBalances(dlt: DLT): DltBalancesContextState {
  const BalancesContext = BalancesContexts[dlt];
  if (!BalancesContext) {
    throw new TypedError(CodingErrors.NoContextFoundForDLT, `DLT: ${dlt}`);
  }
  return useContext(BalancesContext);
}
