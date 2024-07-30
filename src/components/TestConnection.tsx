import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {Program} from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import IDL from '../Anchor_IDL/handmade_naive.json';
import {SetStateAction, useEffect, useState} from 'react';
import {ENV, ISSUER_LOCAL, ISSUER_DEVNET, PRIVATE_KEY, WRAPPER} from '../tmp';
import {useConnection} from '@solana/wallet-adapter-react';

const handleClick = async (
  connection: anchor.web3.Connection,
  setTx: React.Dispatch<SetStateAction<String | null>>,
) => {
  // const connection = new anchor.web3.Connection("https://api.devnet.solana.com");
  // const connection = new anchor.web3.Connection("http://localhost:8899");

  const secretKey = new Uint8Array(PRIVATE_KEY);
  let issuerSecret;
  if (ENV === 'LOCAL') {
    issuerSecret = new Uint8Array(ISSUER_LOCAL);
  } else if (ENV === 'DEV') {
    issuerSecret = new Uint8Array(ISSUER_DEVNET);
  } else {
    issuerSecret = new Uint8Array([
      74, 209, 248, 229, 72, 248, 225, 178, 69, 24, 107, 20, 91, 33, 18, 138,
      115, 249, 31, 109, 149, 38, 115, 244, 170, 168, 84, 164, 80, 30, 115, 159,
      135, 216, 154, 13, 134, 80, 127, 10, 107, 136, 159, 181, 153, 115, 76, 17,
      162, 121, 175, 176, 221, 131, 215, 1, 70, 150, 188, 255, 198, 15, 136, 2,
    ]);
  }

  console.log(issuerSecret);

  const payer = anchor.web3.Keypair.fromSecretKey(secretKey);
  const keypair = anchor.web3.Keypair.generate();
  console.log(keypair.secretKey);
  console.log(payer.publicKey.toBase58());

  const issuer = anchor.web3.Keypair.fromSecretKey(issuerSecret);
  const program = new Program<HandmadeNaive>(IDL as HandmadeNaive, {
    connection,
  });

  const [idendity, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('identity'), keypair.publicKey.toBuffer()],
    program.programId,
  );
  console.log(idendity.toBase58());

  console.log('OK');

  const validity_duration = 1000000;
  console.log('Program is connected');
  const instruction = await program.methods
    .initializeId(new anchor.BN(validity_duration))
    .accountsPartial({
      approver: payer.publicKey,
      wrapperAccount: new anchor.web3.PublicKey(
        WRAPPER,
      ),
      issuer: issuer.publicKey,
      owner: keypair.publicKey,
      payer: payer.publicKey,
      idendity: idendity,
    })
    .instruction();

  const transaction = new anchor.web3.Transaction().add(instruction);
  transaction.feePayer = payer.publicKey;
  try {
    const txid = await anchor.web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [issuer, keypair, payer],
    );
    console.log(txid);

    setTx(txid);
  } catch (error) {
    console.log('Error');
    console.log(error);
  }
};

export const TestConnection = () => {
  const [tx, setTx] = useState<String | null>(null);
  const connection = useConnection().connection;

  return (
    <View>
      <Text>Test Connection</Text>
      <Text>{tx}</Text>
      <Button
        title={'connect'}
        onPress={() => handleClick(connection, setTx)}></Button>
    </View>
  );
};
