import {Button} from 'react-native';
import {
  accessSolanaWallet,
  createSolanaWallet,
} from '../functions/wallet/solana_wallet';
import * as anchor from '@coral-xyz/anchor';

export const TestAccessKey = () => {
  const programId = new anchor.web3.PublicKey(
    'Cxy33pZyucN3HvA3ovzyZaQoMwHGCHT5EEhsjjVaP5T3',
  );
  return (
    <Button
      title="TestAccessKeys"
      onPress={async () => {
        const key = await accessSolanaWallet();
        console.log(key?.publicKey, key?.secretKey);
      }}
    />
  );
};
