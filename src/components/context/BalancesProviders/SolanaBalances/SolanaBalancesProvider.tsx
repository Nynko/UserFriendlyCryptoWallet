import {useState, type FC, type ReactNode} from 'react';
import {DLT, DltAccount} from '../../../../types/account';
import {
  balancesContexts,
  DltBalancesContextState,
} from '../../../../hooks/contexts/useBalances';
import {SolanaMintBalances} from './SolanaMintBalances';

export const SolanaBalancesProvider: FC<{
  children: ReactNode;
  account: DltAccount;
}> = ({children, account}) => {
  const [wrappers, setWrappers] = useState<DltBalancesContextState>({});

  const BalanceContext = balancesContexts[DLT.SOLANA];

  //   export type DltBalancesContextState = Record<WrapperName, BalancesMint>;

  // export type WrapperName = string;

  // /** Mint address as key */
  // export type BalancesMint = Record<string, Mint>;

  // export interface Mint {
  //   mintAddress: web3.PublicKey;
  //   reloadBalanceForMint: () => void;
  // }

  // EITHER I create all the functions that will only modify a specific part of the state
  // And I will memoize the component when showing the balances state

  // Or I do fetch data with components and use a local state to reload the data

  return (
    // List of components with local use effects and use states in order to fetch data
    // Pass setWrapper and properly memoize them...(including props)
    <>
      {Object.values(account.wrapperAddresses).map(_wrappers => {
        Object.values(_wrappers.mints).map(mint => (
          <SolanaMintBalances // Memoized component
            key={mint.mintAddress.toBase58()} // Keys are important here in case of insertion or deletion to prevent re-rendering of all components
            mint={mint.mintAddress}
            setWrappers={setWrappers} // Setters of state doesn't need to be memoized
          />
        ));
      })}
      <BalanceContext.Provider value={wrappers}>
        {children}
      </BalanceContext.Provider>
    </>
  );
};
