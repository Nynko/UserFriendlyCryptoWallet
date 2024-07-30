import {Button} from 'react-native';
import {createSolanaWallet, saveAddress} from '../functions/solana_wallet';
import * as anchor from '@coral-xyz/anchor';
import { WRAPPER } from '../tmp';

export const TestGenerateKey = () => {
  const programId = new anchor.web3.PublicKey(
    'Cxy33pZyucN3HvA3ovzyZaQoMwHGCHT5EEhsjjVaP5T3',
  );
  const wrapperAccount = new anchor.web3.PublicKey(
    WRAPPER,
  );
  return (
    <Button
      title="TestKeys"
      onPress={async () => {
        let publicKey = await createSolanaWallet(programId, wrapperAccount);
        console.log(publicKey);
        saveAddress(publicKey, 'PublicKey', '');
      }}
    />
  );
};
