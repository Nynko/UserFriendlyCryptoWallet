import {useState, type FC, type ReactNode} from 'react';
import {DLT, DltAccount} from '../../../types/account';
import {
  balancesContexts,
  BalancesMint,
  DltBalancesContextState,
} from '../../../hooks/contexts/useBalances';
import {getWrappedAccount} from '../../../functions/solana/getWrappedAccountBalance';
import {useAnchorProgram} from '../../../hooks/contexts/useAnchorProgram';
import React from 'react';
import {getBalance} from '../../../functions/solana/get_account';

export const SolanaBalancesProvider: FC<{
  children: ReactNode;
  account: DltAccount;
}> = React.memo(({children, account}) => {
  const program = useAnchorProgram().program;
  const [wrappers, setWrappers] = useState<DltBalancesContextState>({
    wrappers: {},
    nativeBalance: 0,
  });
  const BalanceContext = balancesContexts[DLT.SOLANA];

  if (Object.keys(wrappers.wrappers).length === 0) {
    const initalObj: DltBalancesContextState = {
      wrappers: {},
      nativeBalance: 0,
    };
    for (const [wrapperName, wrapper] of Object.entries(
      account.wrapperAddresses,
    )) {
      const mintObj: BalancesMint = {};
      for (const [mintAddress, mint] of Object.entries(wrapper.mints)) {
        mintObj[mintAddress] = {
          balance: 0,
          mintAddress: mint.mintAddress,
          reloadBalance: async () => {
            // Fetch logic balance for mint
            const fetchedBalance = await getWrappedAccount(
              account.wrapperAddresses[wrapperName].wrappedToken,
              program,
            );
            const fetchedNativeBalance = await getBalance(
              program.provider.connection,
              account.generalAddresses.pubKey,
            );
            // Add the setWrappers after the fetch logic
            setWrappers(prev => ({
              ...prev,
              nativeBalance: fetchedNativeBalance,
              wrappers: {
                [wrapperName]: {
                  ...prev.wrappers[wrapperName],
                  [mintAddress]: {
                    ...prev.wrappers[wrapperName][mintAddress],
                    balance: fetchedBalance,
                  },
                },
              },
            }));
          },
        };
        initalObj.wrappers[wrapperName] = mintObj;
      }

      setWrappers(prev => ({
        ...prev,
        ...initalObj,
      }));
    }
  }

  return (
    <BalanceContext.Provider value={wrappers}>
      {children}
    </BalanceContext.Provider>
  );
});
