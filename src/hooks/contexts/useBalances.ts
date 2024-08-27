import {Context, createContext, useContext} from 'react';
import {DLT} from '../../types/account';
import {web3 as web3} from '@coral-xyz/anchor';
import {TypedError} from '../../Errors/TypedError';
import {CodingErrors} from '../../Errors/CodingError';

export type DltBalancesContextState = Record<WrapperName, BalancesMint>;

export type WrapperName = string;

/** Mint address as key */
export type BalancesMint = Record<string, Mint>;

export interface Mint {
  mintAddress: web3.PublicKey;
  reloadBalanceForMint: () => void;
}

export const balancesContexts = Object.keys(DLT).reduce((acc, key) => {
  acc[key as DLT] = createContext<DltBalancesContextState>(
    {} as DltBalancesContextState,
  );
  return acc;
}, {} as Record<DLT, Context<DltBalancesContextState>>);

export function useBalances(dlt: DLT): DltBalancesContextState {
  const BalancesContext = balancesContexts[dlt];
  if (!BalancesContext) {
    throw new TypedError(CodingErrors.NoContextFoundForDLT, `DLT: ${dlt}`);
  }
  return useContext(BalancesContext);
}
