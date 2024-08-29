import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import {DLT, DltAccount} from '../../../types/account';
import {
  BalancesContexts,
  BalancesMint,
  DltBalancesContextState,
} from '../../../hooks/contexts/useBalances';
import {getWrappedAccount} from '../../../functions/solana/getWrappedAccountBalance';
import {useAnchorProgram} from '../../../hooks/contexts/useAnchorProgram';
import React from 'react';
import {getBalance} from '../../../functions/solana/get_account';
import {BalancesDispatchContextState} from '../../../hooks/contexts/useBalancesDispatch';
import {produce} from 'immer';
import {useBoolStateOnce} from '../../../hooks/useBoolState';
import {updateReloadAll} from './updateReloadAll';
import {useAccount} from '../../../hooks/contexts/useAccount';

function initWrapperBalance(account: DltAccount): DltBalancesContextState {
  let initWrappers = {} as Record<string, BalancesMint>;
  for (const [wrapperName, wrapper] of Object.entries(
    account.wrapperAddresses,
  )) {
    const mintObj: BalancesMint = {};
    for (const mintAddress of Object.keys(wrapper.mints)) {
      mintObj[mintAddress] = {
        balance: 0,
      };
      initWrappers[wrapperName] = mintObj;
    }
  }
  return {
    wrappers: initWrappers,
    nativeBalance: 0,
  };
}

export const SolanaBalancesProvider: FC<{
  children: ReactNode;
  account: DltAccount;
  setDispatchFunctions: Dispatch<SetStateAction<BalancesDispatchContextState>>;
}> = React.memo(({children, account, setDispatchFunctions}) => {
  const accounts = useAccount();
  const program = useAnchorProgram().program;
  const [wrappers, setWrappers] = useState<DltBalancesContextState>(() =>
    initWrapperBalance(account),
  );
  const [isNotFirstTime, setNotFirstTime] = useBoolStateOnce();

  useEffect(() => {
    if (!isNotFirstTime) {
      setNotFirstTime();
      for (const wrapperAddress of Object.keys(account.wrapperAddresses)) {
        for (const mintAddress of Object.keys(
          account.wrapperAddresses[wrapperAddress].mints,
        )) {
          const reloadBalance = async () => {
            // Fetch logic balance for mint
            const fetchedBalance = await getWrappedAccount(
              account.wrapperAddresses[wrapperAddress].wrappedToken,
              program,
            );
            const fetchedNativeBalance = await getBalance(
              program.provider.connection,
              account.generalAddresses.pubKey,
            );
            // Add the setWrappers after the fetch logic
            setWrappers(prev =>
              produce(prev, drafState => {
                drafState.nativeBalance = fetchedNativeBalance;
                drafState.wrappers[wrapperAddress][mintAddress].balance =
                  fetchedBalance;
              }),
            );
          };
          setDispatchFunctions(prev =>
            produce(prev, drafState => {
              drafState.dltDispatch[DLT.SOLANA].wrappers[wrapperAddress][
                mintAddress
              ].reloadBalance = reloadBalance;
              drafState.reloadAllBalances = updateReloadAll(
                accounts,
                drafState,
              );
            }),
          );
        }
      }
    }
  }, [
    account.generalAddresses.pubKey,
    account.wrapperAddresses,
    isNotFirstTime,
    program,
    setDispatchFunctions,
    setNotFirstTime,
  ]);
  const BalanceContext = BalancesContexts[DLT.SOLANA];

  return (
    <BalanceContext.Provider value={wrappers}>
      {children}
    </BalanceContext.Provider>
  );
});
