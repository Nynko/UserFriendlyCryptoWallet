import {FC, ReactNode, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import * as ledger from '@solana/wallet-adapter-ledger';

const SolanaConnection: FC<{children: ReactNode}> = ({children}) => {
  const endpoint = 'http://172.20.10.11:8899';
  const webSocketEndpoint = 'ws://172.20.10.11:8900';
  const wallets = useMemo(() => {
    return [new ledger.LedgerWalletAdapter()];
  }, []);

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{commitment: 'confirmed', wsEndpoint: webSocketEndpoint}}>
      {children}
    </ConnectionProvider>
  );
};

export default SolanaConnection;
