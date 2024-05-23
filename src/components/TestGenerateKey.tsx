import {Button} from 'react-native';
import {createSolanaWallet} from '../functions/solana_wallet';
import * as anchor from '@coral-xyz/anchor';

export const TestGenerateKey = () => {
  const programId = new anchor.web3.PublicKey(
    'Cxy33pZyucN3HvA3ovzyZaQoMwHGCHT5EEhsjjVaP5T3',
  );
  const wrapperAccount = new anchor.web3.PublicKey("3gfvTF5mEkHtZvn8d4wVFL7RsMfnBN2nyLn15TVhnR6x");
  return (
    <Button title="TestKeys" onPress={() => {createSolanaWallet(programId,wrapperAccount)}} />
  );
};
