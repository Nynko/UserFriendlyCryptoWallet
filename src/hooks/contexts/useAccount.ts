import {createContext, useContext} from 'react';
import {
  DLT,
  DltAccount,
  MintAddress,
  WrapperAddress,
} from '../../types/account';

export interface AccountContextState {
  dltAccounts: Record<DLT, DltAccount>;
}

export interface AccountDispatchContext {
  addDltAccount: (
    dlt: DLT,
    dltAccount: DltAccount,
    account: AccountContextState,
  ) => void;
  updateDltAccount: (
    dltAccount: DltAccount,
    dlt: DLT,
    account: AccountContextState,
  ) => void;
  addWrapperAddress: (
    dlt: DLT,
    wrapperAddress: WrapperAddress,
    account: AccountContextState,
  ) => void;
  addMint(
    dlt: DLT,
    wrapper: string,
    address: MintAddress,
    account: AccountContextState,
  ): void;
}

export const AccountContext = createContext<AccountContextState>(
  {} as AccountContextState,
);

// We separate the dispatch context from the state context because we want to avoid
// unnecessary re-renders when the state changes for components that only need to
// dispatch actions.
export const AccountDispatchContext = createContext<AccountDispatchContext>(
  {} as AccountDispatchContext,
);

export function useAccount(): AccountContextState {
  return useContext(AccountContext);
}

export function useAccountDispatch(): AccountDispatchContext {
  return useContext(AccountDispatchContext);
}
