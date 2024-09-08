import {FC, ReactNode, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import * as ledger from '@solana/wallet-adapter-ledger';
import {SOLANA_ENDPOINT, SOLANA_WS_ENDPOINT} from '@env';

const SolanaConnection: FC<{children: ReactNode}> = ({children}) => {
  const endpoint = SOLANA_ENDPOINT;
  const webSocketEndpoint = SOLANA_WS_ENDPOINT;
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
