import {type FC, type ReactNode} from 'react';
import {useAccount} from '../../../hooks/contexts/useAccount';
import {DLT} from '../../../types/account';
import {SolanaBalancesProvider} from './SolanaBalancesProvider';

export const BalancesProvider: FC<{
  children: ReactNode;
}> = ({children}) => {
  const accounts = useAccount();

  return (
    // Can Add more providers here specific to a DLT
    <SolanaBalancesProvider account={accounts.dltAccounts[DLT.SOLANA]}>
      {children}
    </SolanaBalancesProvider>
  );
};
