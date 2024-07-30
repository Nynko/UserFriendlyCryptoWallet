import * as anchor from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';


interface RawTxData {
  transaction: String,
  blockhash: String,
};

async function signTwoAuth(rawData: RawTxData) : Promise<RawTxData | Error> {
  try {
    const response = await fetch('http://192.168.1.240:3000/two-auth-sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return (error as Error)
  }
};

export async function transferToken( amount: number,
  wrapper_account: anchor.web3.PublicKey,
  source_owner: anchor.web3.Signer,
  source_wrapped_account: anchor.web3.PublicKey,
  destination_owner: anchor.web3.PublicKey,
  destination_wrapped_account: anchor.web3.PublicKey,
  two_auth: anchor.web3.PublicKey,
  two_auth_signer: anchor.web3.PublicKey | null,
  program: anchor.Program<HandmadeNaive>,
){

  const instruction = await program.methods
    .transfer(new anchor.BN(amount))
    .accountsPartial({
      sourceOwner: source_owner.publicKey,
      destinationOwner: destination_owner,
      sourceWrappedAccount: source_wrapped_account,
      destinationWrappedAccount: destination_wrapped_account,
      twoAuthSigner: two_auth_signer ? two_auth_signer : null,
      twoAuth: two_auth,
      wrapperAccount: wrapper_account,
    })
    .instruction();
    
  const transaction = new anchor.web3.Transaction().add(instruction);

  const blockhash = await program.provider.connection.getLatestBlockhashAndContext();

  transaction.recentBlockhash = blockhash.value.blockhash;
  transaction.lastValidBlockHeight = blockhash.value.lastValidBlockHeight;
  transaction.feePayer = source_owner.publicKey;

  transaction.partialSign(source_owner);

  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false,
  });

  // return [serializedTransaction, { blockhash: blockhash.value.blockhash, lastValidBlockHeight: blockhash.value.lastValidBlockHeight }]


  const rawTx =  await signTwoAuth({ transaction: serializedTransaction.toString('base64'), blockhash: blockhash.value.blockhash });
  let rawTx2 : Buffer;
  if (rawTx instanceof Error){
    throw rawTx;
  } else {
    rawTx2 = Buffer.from(rawTx.transaction, 'base64');
  }

  const txSig = await program.provider.connection.sendRawTransaction(rawTx2);

  const confirmStrategy: anchor.web3.BlockheightBasedTransactionConfirmationStrategy = {
    blockhash: blockhash.value.blockhash,
    lastValidBlockHeight: blockhash.value.lastValidBlockHeight,
    signature: txSig
  }

  await program.provider.connection.confirmTransaction(confirmStrategy);

  console.log(`Transfer (wrapped) raw tx : ${txSig}`);

}

export async function transferTokenNoSignature(
  amount: number,
  wrapper_account: anchor.web3.PublicKey,
  source_owner: anchor.web3.Signer,
  source_wrapped_account: anchor.web3.PublicKey,
  destination_owner: anchor.web3.PublicKey,
  destination_wrapped_account: anchor.web3.PublicKey,
  two_auth: anchor.web3.PublicKey,
  two_auth_signer: anchor.web3.Signer | null,
  program: anchor.Program<HandmadeNaive>,
) {
  const instruction = await program.methods
    .transfer(new anchor.BN(amount))
    .accountsPartial({
      sourceOwner: source_owner.publicKey,
      destinationOwner: destination_owner,
      sourceWrappedAccount: source_wrapped_account,
      destinationWrappedAccount: destination_wrapped_account,
      twoAuthSigner: two_auth_signer ? two_auth_signer.publicKey : null,
      twoAuth: two_auth,
      wrapperAccount: wrapper_account,
    })
    .instruction();

  const transaction = new anchor.web3.Transaction().add(instruction);
  try {
    const txSig = await anchor.web3.sendAndConfirmTransaction(
      program.provider.connection,
      transaction,
      two_auth_signer ? [source_owner, two_auth_signer] : [source_owner],
    );
    console.log(`Transfer (wrapped) of ${amount} tx : ${txSig}`);
  } catch (error) {
    console.log(error);
    console.log((error as anchor.AnchorError).logs);
  }
}
