import {FC, ReactNode, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import * as ledger from '@solana/wallet-adapter-ledger';

const SolanaConnection: FC<{children: ReactNode}> = ({children}) => {
  const endpoint = 'http://192.168.1.240:8899';
  const wallets = useMemo(() => {
    return [new ledger.LedgerWalletAdapter()];
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>{children}</ConnectionProvider>
  );
};

export default SolanaConnection;
