import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {useConnection} from '@solana/wallet-adapter-react';
import {getMintDecimals} from '../functions/addresses/getMintDecimals';
import {EURC_MINT} from '../const';

const handleClick = async (
  connection: anchor.web3.Connection,
  mint: anchor.web3.PublicKey,
) => {
  let decimals = await getMintDecimals(mint, connection);
  console.log('decimals', decimals);
  // const connection = new anchor.web3.Connection("https://api.devnet.solana.com");
  // const connection = new anchor.web3.Connection("http://localhost:8899");
  // getWrappedTokenAccounts(new anchor.web3.PublicKey(WRAPPER_PDA), connection);
};

export const TestConnection = () => {
  const connection = useConnection().connection;
  const mint = new anchor.web3.PublicKey(EURC_MINT);

  return (
    <View>
      <Text>Test Connection</Text>
      <Text>{undefined}</Text>
      <Button title={'connect'} onPress={() => handleClick(connection, mint)} />
    </View>
  );
};
