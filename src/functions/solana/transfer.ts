import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import {signTwoAuth} from '../backends/signatures';
import {TypedError} from '../../Errors/TypedError';
import {SolanaWalletErrors} from '../../Errors/Solana/SolanaWalletsErrors';

export async function transferToken(
  amount: number,
  decimal: number,
  wrapper_account: anchor.web3.PublicKey,
  source_owner: anchor.web3.Signer,
  source_wrapped_account: anchor.web3.PublicKey,
  destination_owner: anchor.web3.PublicKey,
  destination_wrapped_account: anchor.web3.PublicKey,
  two_auth: anchor.web3.PublicKey,
  two_auth_signer: anchor.web3.PublicKey | null,
  mint: anchor.web3.PublicKey,
  approver: anchor.web3.PublicKey,
  tokenProgram: anchor.web3.PublicKey,
  program: anchor.Program<AssetBased>,
) {
  const instruction = await program.methods
    .transfer(new anchor.BN(amount), decimal)
    .accountsPartial({
      sourceOwner: source_owner.publicKey,
      payer: source_owner.publicKey,
      destinationOwner: destination_owner,
      sourceWrappedAccount: source_wrapped_account,
      destinationWrappedAccount: destination_wrapped_account,
      twoAuthSigner: two_auth_signer ? two_auth_signer : null,
      twoAuth: two_auth,
      wrapperAccount: wrapper_account,
      mint,
      approver,
      tokenProgram,
    })
    .instruction();

  const transaction = new anchor.web3.Transaction().add(instruction);

  const blockhash =
    await program.provider.connection.getLatestBlockhashAndContext();

  transaction.recentBlockhash = blockhash.value.blockhash;
  transaction.lastValidBlockHeight = blockhash.value.lastValidBlockHeight;
  transaction.feePayer = source_owner.publicKey;

  transaction.partialSign(source_owner);

  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false,
  });

  // return [serializedTransaction, { blockhash: blockhash.value.blockhash, lastValidBlockHeight: blockhash.value.lastValidBlockHeight }]

  const rawTx = await signTwoAuth({
    transaction: serializedTransaction.toString('base64'),
    blockhash: blockhash.value.blockhash,
  });
  let rawTx2: Buffer;
  if (rawTx instanceof Error) {
    throw rawTx;
  } else {
    rawTx2 = Buffer.from(rawTx.transaction, 'base64');
  }

  const txSig = await program.provider.connection
    .sendRawTransaction(rawTx2)
    .catch(async e => {
      if (e instanceof anchor.web3.SendTransactionError) {
        if (
          e.transactionError.message ===
            'Transaction simulation failed: Attempt to debit an account but found no record of a prior credit.' ||
          e.transactionError.message ===
            'Transaction simulation failed: Transaction results in an account (0) with insufficient funds for rent'
        ) {
          throw new TypedError(
            SolanaWalletErrors.NotEnoughSolBalanceToPayFees,
            undefined,
            e,
          );
        } else if (
          e.logs &&
          e.logs.includes('Program log: Error: insufficient funds')
        ) {
          throw new TypedError(SolanaWalletErrors.NotEnoughTokenBalance);
        }
        throw new Error(`Unknown SendTransactionError: ${e}`);
      } else {
        throw e;
      }
    });

  const confirmStrategy: anchor.web3.BlockheightBasedTransactionConfirmationStrategy =
    {
      blockhash: blockhash.value.blockhash,
      lastValidBlockHeight: blockhash.value.lastValidBlockHeight,
      signature: txSig,
    };

  await program.provider.connection.confirmTransaction(confirmStrategy);

  console.log(`Transfer (wrapped) raw tx : ${txSig}`);

  // const txResponse = await program.provider.connection.getTransaction(txSig, {
  //   commitment: 'confirmed',
  // });

  // if (!txResponse) {
  //   throw new TypedError(SolanaWalletErrors.TransactionNotFound);
  // }
  // const tx = parseSolanaTransaction(txSig, txResponse);

  // return tx;
}
// TODO OLD
export async function transferTokenNoSignature(
  amount: number,
  decimals: number,
  wrapper_account: anchor.web3.PublicKey,
  source_owner: anchor.web3.Signer,
  source_wrapped_account: anchor.web3.PublicKey,
  destination_owner: anchor.web3.PublicKey,
  destination_wrapped_account: anchor.web3.PublicKey,
  two_auth: anchor.web3.PublicKey,
  two_auth_signer: anchor.web3.Signer | null,
  program: anchor.Program<AssetBased>,
) {
  const instruction = await program.methods
    .transfer(new anchor.BN(amount), decimals)
    .accountsPartial({
      sourceOwner: source_owner.publicKey,
      payer: source_owner.publicKey,
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
