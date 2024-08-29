import {useState, type FC, type ReactNode} from 'react';
import {
  AccountContextState,
  useAccount,
} from '../../../hooks/contexts/useAccount';
import {DLT} from '../../../types/account';
import {SolanaBalancesProvider} from './SolanaBalancesProvider';
import {
  BalancesDispatchContext,
  BalancesDispatchContextState,
  DltBalancesDispatchContextState,
} from '../../../hooks/contexts/useBalancesDispatch';
import {updateReloadAll} from './updateReloadAll';

function initDispatch(accounts: AccountContextState) {
  let dispatchFunctions = {} as BalancesDispatchContextState;
  let dltDispatch = {} as Record<DLT, DltBalancesDispatchContextState>;
  for (const dltAccount of Object.keys(accounts.dltAccounts) as DLT[]) {
    const localDltAccount = accounts.dltAccounts[dltAccount];
    let wrappers = {} as Record<string, Record<string, any>>;
    for (const wrapper of Object.values(localDltAccount.wrapperAddresses)) {
      let mint = {} as Record<string, any>;
      for (const mintAddress of Object.keys(wrapper.mints)) {
        mint[mintAddress] = {
          reloadBalance: async () => {},
        };
      }
      wrappers[wrapper.wrapper.toBase58()] = mint;
    }
    dltDispatch[dltAccount] = {
      wrappers: wrappers,
      reloadNativeBalance: async () => {},
    };
  }

  dispatchFunctions.dltDispatch = dltDispatch;
  dispatchFunctions.reloadAllBalances = updateReloadAll(
    accounts,
    dispatchFunctions,
  );
  return dispatchFunctions;
}

export const BalancesProvider: FC<{
  children: ReactNode;
}> = ({children}) => {
  const accounts = useAccount();

  const [dispatchFunctions, setDispatchFunctions] =
    useState<BalancesDispatchContextState>(() => initDispatch(accounts));

  return (
    <BalancesDispatchContext.Provider value={dispatchFunctions}>
      {/** Can Add more providers here specific to a DLT*/}
      <SolanaBalancesProvider
        account={accounts.dltAccounts[DLT.SOLANA]}
        setDispatchFunctions={setDispatchFunctions}>
        {children}
      </SolanaBalancesProvider>
    </BalancesDispatchContext.Provider>
  );
};
