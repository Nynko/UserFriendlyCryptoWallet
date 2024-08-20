import {FC, ReactNode, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import * as ledger from '@solana/wallet-adapter-ledger';

const SolanaConnection: FC<{children: ReactNode}> = ({children}) => {
  const endpoint = 'http://172.20.10.11:8899';
  const wallets = useMemo(() => {
    return [new ledger.LedgerWalletAdapter()];
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>{children}</ConnectionProvider>
  );
};

export default SolanaConnection;
