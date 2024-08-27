import {type FC, type ReactNode} from 'react';
import {useAccount} from '../../../hooks/contexts/useAccount';
import {DLT} from '../../../types/account';
import {SolanaBalancesProvider} from './SolanaBalances/SolanaBalancesProvider';

export const BalancesProvider: FC<{
  children: ReactNode;
}> = ({children}) => {
  const accounts = useAccount();

  return (
    <SolanaBalancesProvider account={accounts.dltAccounts[DLT.SOLANA]}>
      {children}
    </SolanaBalancesProvider>
  );
};
