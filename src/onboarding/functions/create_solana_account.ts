/* 
This contain the logic for creating a token account for a given wallet.
*/
import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import {Program} from '@coral-xyz/anchor';
import {
  accessSolanaWallet,
  createSolanaWallet,
} from '../../functions/wallet/solana_wallet';
import {
  APPROVER,
  EURC_MINT,
  ID_ISSUER,
  TWO_AUTH_AUTHORITY,
  WRAPPER_PDA,
} from '../../const';
import {signIssuerId, signTwoAuth} from '../../functions/backends/signatures';
import {TOKEN_PROGRAM_ID} from '@coral-xyz/anchor/dist/cjs/utils/token';

export async function create_account(
  pseudo: string,
  program: Program<AssetBased>,
) {
  console.log('Start creating account');

  const approver = new anchor.web3.PublicKey(APPROVER);
  const wrapper = new anchor.web3.PublicKey(WRAPPER_PDA);
  const issuer_id = new anchor.web3.PublicKey(ID_ISSUER);
  const mint = new anchor.web3.PublicKey(EURC_MINT);
  const mint_decimals = 2;
  const twoAuthEntity = new anchor.web3.PublicKey(TWO_AUTH_AUTHORITY);
  const token_program_id = TOKEN_PROGRAM_ID;
  const two_auth_entity_token_account = anchor.utils.token.associatedAddress({
    mint,
    owner: twoAuthEntity,
  });
  const [sol_addr, wrapped_account_check] = await createSolanaWallet(
    program.programId,
    wrapper,
    mint,
  );

  const signer = await accessSolanaWallet();

  console.log('Signer', signer.publicKey.toString());

  if (sol_addr.toString() != signer.publicKey.toString()) {
    throw new Error(
      "Error when creating the account, the created address doesn't match the recovered address.",
    );
  }

  const transaction = new anchor.web3.Transaction();
  const [idendity, idInstruction] = await issue_idendity_instruction(
    2592000, // 30 days
    signer,
    issuer_id,
    issuer_id,
    approver,
    wrapper,
    program,
  );

  transaction.add(idInstruction);

  const [twoAuth, twoAuthInstruction] = await initialize_two_auth_instruction(
    signer,
    twoAuthEntity,
    idendity,
    approver,
    wrapper,
    twoAuthEntity,
    program,
  );

  transaction.add(twoAuthInstruction);

  const [wrappedAccount, wrappedAccountInstruction] =
    await initialize_wrapped_account_instruction(
      mint_decimals,
      wrapper,
      approver,
      signer.publicKey,
      twoAuthEntity,
      mint,
      two_auth_entity_token_account,
      token_program_id,
      program,
    );

  transaction.add(wrappedAccountInstruction);

  const [recoveryAccount, recoveryInstruction] =
    await initialize_recovery_account_instruction(
      [{authority: twoAuth, minSignatures: 1, minDuration: 864000}],
      issuer_id,
      signer,
      approver,
      mint,
      wrapper,
      program,
    );

  transaction.add(recoveryInstruction);

  const [pseudoAccount, pseudoInstruction] =
    await initialize_pseudo_instruction(
      twoAuthEntity,
      idendity,
      signer,
      pseudo,
      program,
    );

  transaction.add(pseudoInstruction);

  if (wrappedAccount.toString() != wrapped_account_check.toString()) {
    throw new Error('Error when deriving the wrapped account');
  }

  const blockhash =
    await program.provider.connection.getLatestBlockhashAndContext();

  transaction.recentBlockhash = blockhash.value.blockhash;
  transaction.lastValidBlockHeight = blockhash.value.lastValidBlockHeight;
  transaction.feePayer = twoAuthEntity;

  transaction.partialSign(signer);

  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false,
  });

  // return [serializedTransaction, { blockhash: blockhash.value.blockhash, lastValidBlockHeight: blockhash.value.lastValidBlockHeight }]

  const rawTx = await signTwoAuth({
    transaction: serializedTransaction.toString('base64'),
    blockhash: blockhash.value.blockhash,
  });

  if (rawTx instanceof Error) {
    throw rawTx;
  }

  const rawTx2 = await signIssuerId({
    transaction: rawTx.transaction,
    blockhash: blockhash.value.blockhash,
  });

  let rawTx3: Buffer;
  if (rawTx2 instanceof Error) {
    throw rawTx2;
  } else {
    rawTx3 = Buffer.from(rawTx2.transaction, 'base64');
  }

  const txSig = await program.provider.connection.sendRawTransaction(rawTx3);

  const confirmStrategy: anchor.web3.BlockheightBasedTransactionConfirmationStrategy =
    {
      blockhash: blockhash.value.blockhash,
      lastValidBlockHeight: blockhash.value.lastValidBlockHeight,
      signature: txSig,
    };

  await program.provider.connection.confirmTransaction(confirmStrategy);

  console.log('Finish creating account');

  return {
    pk: signer.publicKey,
    idendity,
    wrappedAccount,
    twoAuth,
    twoAuthEntity,
    recoveryAccount,
    pseudoAccount,
    pseudo,
  };
}

interface RecoveryAuthority {
  authority: anchor.web3.PublicKey;
  minSignatures: number;
  minDuration: number;
}

async function initialize_recovery_account_instruction(
  authorities: RecoveryAuthority[],
  payer: anchor.web3.PublicKey,
  owner: anchor.web3.Signer,
  approver: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey,
  wrapper: anchor.web3.PublicKey,
  program: anchor.Program<AssetBased>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [recovery_account, _bump] =
    anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('recovery'), owner.publicKey.toBuffer()],
      program.programId,
    );

  console.log('[Pk] User recovery account', recovery_account.toBase58());

  const instruction = await program.methods
    .initializeRecovery(authorities)
    .accountsPartial({
      payer: payer,
      owner: owner.publicKey,
      approver: approver,
      mint: mint,
      wrapperAccount: wrapper,
      recoveryAuthority: recovery_account,
    })
    .instruction();

  return [recovery_account, instruction];
}

async function initialize_wrapped_account_instruction(
  decimals: number,
  wrapper: anchor.web3.PublicKey,
  approver: anchor.web3.PublicKey,
  owner_to_account: anchor.web3.PublicKey,
  owner_from_token_account: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey,
  from_token_account: anchor.web3.PublicKey,
  tokenProgram: anchor.web3.PublicKey,
  program: Program<AssetBased>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [wrapped_account, _bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('wrapped_token'),
      wrapper.toBuffer(),
      mint.toBuffer(),
      owner_to_account.toBuffer(),
    ],
    program.programId,
  );

  console.log('[Pk] User Wrapped account', wrapped_account.toBase58());

  const instruction = await program.methods
    .wrapTokens(new anchor.BN(0), decimals)
    .accountsPartial({
      toWrappedTokenAccount: wrapped_account,
      ownerToAccount: owner_to_account,
      fromTokenAccount: from_token_account,
      ownerFromTokenAccount: owner_from_token_account,
      wrapperAccount: wrapper,
      approver: approver,
      mint: mint,
      tokenProgram: tokenProgram,
    })
    .instruction();

  return [wrapped_account, instruction];
}

async function initialize_two_auth_instruction(
  owner: anchor.web3.Signer,
  payer: anchor.web3.PublicKey,
  idendity: anchor.web3.PublicKey,
  approver: anchor.web3.PublicKey,
  wrapper_account: anchor.web3.PublicKey,
  two_auth_entity: anchor.web3.PublicKey,
  program: Program<AssetBased>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [two_auth, _bump] = await anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('two_auth'),
      wrapper_account.toBuffer(),
      owner.publicKey.toBuffer(),
    ],
    program.programId,
  );

  console.log('[Pk] Two Auth account', two_auth.toBase58());

  const instruction = await program.methods
    .initializeTwoAuth({
      functions: [
        {onMax: {max: new anchor.BN(10)}},
        {
          counterResetOnMax: {
            max: new anchor.BN(10),
            counter: new anchor.BN(0),
          },
        },
        {
          counterResetOnTime: {
            max: new anchor.BN(10),
            duration: {seconds: [1]},
            lastResetTime: new anchor.BN(56),
            counter: new anchor.BN(0),
          },
        },
        {
          counterWithTimeWindow: {
            max: new anchor.BN(10),
            window: {
              duration: {days: [30]},
              lastValueTime: new anchor.BN(0),
              window: [],
              startIndex: 0,
            },
          },
        },
        {deactivateForUserSpecificWhiteList: {whiteList: []}},
        {always: {}},
      ],
      allowedIssuers: [approver],
    })
    .accountsPartial({
      wrapperAccount: wrapper_account,
      approver: approver,
      owner: owner.publicKey,
      payer: payer,
      twoAuth: two_auth,
      idendity: idendity,
      twoAuthEntity: two_auth_entity,
    })
    .instruction();

  return [two_auth, instruction];
}

async function issue_idendity_instruction(
  validity_duration: number,
  owner: anchor.web3.Signer,
  issuer: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  approver: anchor.web3.PublicKey,
  wrapper: anchor.web3.PublicKey,
  program: Program<AssetBased>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [idendity, _bump] = await anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('identity'), owner.publicKey.toBuffer()],
    program.programId,
  );

  console.log(`[Pk] Issue  Idendity : ${idendity}`);

  const instruction = await program.methods
    .initializeId(new anchor.BN(validity_duration))
    .accountsPartial({
      approver: approver,
      wrapperAccount: wrapper,
      issuer: issuer,
      owner: owner.publicKey,
      payer: payer,
      idendity: idendity,
    })
    .instruction();

  return [idendity, instruction];
}

async function initialize_pseudo_instruction(
  payer: anchor.web3.PublicKey,
  idendity: anchor.web3.PublicKey,
  owner: anchor.web3.Signer,
  pseudo: string,
  program: anchor.Program<AssetBased>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [pseudo_account, _bump] =
    await anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('pseudo'), Buffer.from(pseudo)],
      program.programId,
    );

  const instruction = await program.methods
    .addPseudo(pseudo)
    .accountsPartial({
      owner: owner.publicKey,
      idendity,
      pseudoAccount: pseudo_account,
      payer,
    })
    .instruction();

  console.log(`[PK] Pseudo account : ${pseudo_account}`);

  return [pseudo_account, instruction];
}
