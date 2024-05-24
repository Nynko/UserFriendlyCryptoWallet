/* 
This contain the logic for creating a token account for a given wallet.
*/
import * as anchor from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import IDL from '../Anchor_IDL/handmade_naive.json';
import {Program} from '@coral-xyz/anchor';
import {TOKEN_PROGRAM_ID} from '@coral-xyz/anchor/dist/cjs/utils/token';
import {accessSolanaWallet, saveAddress} from './solana_wallet';

export async function create_account(connection: anchor.web3.Connection) {
  const program = new Program<HandmadeNaive>(IDL as HandmadeNaive, {
    connection,
  });
  const signer = await accessSolanaWallet();
  const secretKey = new Uint8Array([
    168, 211, 226, 112, 155, 144, 84, 189, 91, 180, 27, 154, 232, 214, 171, 34,
    170, 170, 129, 92, 121, 182, 191, 46, 214, 251, 216, 56, 75, 188, 172, 111,
    183, 94, 11, 97, 242, 122, 154, 242, 188, 154, 126, 25, 182, 99, 199, 61,
    219, 36, 179, 98, 237, 169, 19, 188, 167, 169, 130, 113, 121, 123, 123, 63,
  ]);
  const issuerKey = new Uint8Array([
    7, 180, 193, 197, 0, 71, 3, 215, 189, 62, 105, 174, 103, 217, 159, 213, 150,
    87, 51, 162, 196, 76, 106, 180, 149, 49, 242, 76, 144, 60, 255, 176, 208,
    28, 91, 68, 184, 212, 238, 247, 179, 135, 221, 93, 64, 94, 216, 131, 193,
    192, 188, 170, 153, 27, 2, 17, 91, 64, 205, 185, 251, 95, 165, 157,
  ]);
  const payer = anchor.web3.Keypair.fromSecretKey(secretKey);
  const issuer = anchor.web3.Keypair.fromSecretKey(issuerKey);
  const wrapper = new anchor.web3.PublicKey(
    '3gfvTF5mEkHtZvn8d4wVFL7RsMfnBN2nyLn15TVhnR6x',
  );
  const mint = new anchor.web3.PublicKey(
    'BCEkAUyM6NZtoorWn4n7b5pk7aN4haJAqifUEQQ8Ut8W',
  );

  const transaction = new anchor.web3.Transaction();
  const [idendity, idInstruction] = await issue_idendity_instruction(
    1000,
    signer,
    issuer,
    payer,
    payer.publicKey,
    wrapper,
    program,
  );

  transaction.add(idInstruction);

  const [twoAuth, twoAuthInstruction] = await initialize_two_auth_instruction(
    signer,
    payer,
    idendity,
    payer.publicKey,
    wrapper,
    payer.publicKey,
    program,
  );

  transaction.add(twoAuthInstruction);

  const [wrappedAccount, wrappedAccountInstruction] =
    await initialize_wrapped_account_instruction(
      signer,
      payer,
      mint,
      payer.publicKey,
      wrapper,
      program,
    );

  transaction.add(wrappedAccountInstruction);

  // Recovery

  transaction.feePayer = payer.publicKey;

  try {
    // let blockhash = (await connection.getLatestBlockhash('confirmed'))
    //   .blockhash;
    // transaction.recentBlockhash = blockhash;
    const txid = await anchor.web3.sendAndConfirmTransaction(
      program.provider.connection,
      transaction,
      [issuer, signer, payer],
      {commitment: 'confirmed'},
    );
    console.log(`Creating Account tx : ${txid}`);
  } catch (error) {
    console.log(error);

    console.log((error as anchor.AnchorError).logs);
  }

  await saveAddress(
    wrappedAccount,
    'WrappedAccount' + mint.toString(),
    mint.toString(),
  );

  await saveAddress(idendity, 'Idendity', '');

  await saveAddress(twoAuth, 'TwoAuth' + wrappedAccount.toString(), '');
}

async function initialize_wrapped_account_instruction(
  owner: anchor.web3.Signer,
  payer: anchor.web3.Signer,
  mint: anchor.web3.PublicKey,
  approver: anchor.web3.PublicKey,
  wrapper_account: anchor.web3.PublicKey,
  program: Program<HandmadeNaive>,
  token_program: anchor.web3.PublicKey = TOKEN_PROGRAM_ID,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [wrapped_account, bump] =
    await anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from('wrapped_token'),
        wrapper_account.toBuffer(),
        mint.toBuffer(),
        owner.publicKey.toBuffer(),
      ],
      program.programId,
    );

  console.log('[Pk] User Wrapped account', wrapped_account.toBase58());

  const instruction = await program.methods
    .initializeWrapAccount()
    .accountsPartial({
      payer: payer.publicKey,
      wrapperAccount: wrapper_account,
      approver: approver,
      owner: owner.publicKey,
      mint: mint,
      wrappedTokenAccount: wrapped_account,
      tokenProgram: token_program,
    })
    .instruction();

  return [wrapped_account, instruction];
}

async function initialize_two_auth_instruction(
  owner: anchor.web3.Signer,
  payer: anchor.web3.Signer,
  idendity: anchor.web3.PublicKey,
  approver: anchor.web3.PublicKey,
  wrapper_account: anchor.web3.PublicKey,
  two_auth_entity: anchor.web3.PublicKey,
  program: Program<HandmadeNaive>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [two_auth, bump] = await anchor.web3.PublicKey.findProgramAddressSync(
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
      payer: payer.publicKey,
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
  issuer: anchor.web3.Signer,
  payer: anchor.web3.Signer,
  approver: anchor.web3.PublicKey,
  wrapper: anchor.web3.PublicKey,
  program: Program<HandmadeNaive>,
): Promise<[anchor.web3.PublicKey, anchor.web3.TransactionInstruction]> {
  const [idendity, bump] = await anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('identity'), owner.publicKey.toBuffer()],
    program.programId,
  );

  console.log(`[Pk] Issue  Idendity : ${idendity}`);

  const instruction = await program.methods
    .initializeId(new anchor.BN(validity_duration))
    .accountsPartial({
      approver: approver,
      wrapperAccount: wrapper,
      issuer: issuer.publicKey,
      owner: owner.publicKey,
      payer: payer.publicKey,
      idendity: idendity,
    })
    .instruction();

  return [idendity, instruction];
}
