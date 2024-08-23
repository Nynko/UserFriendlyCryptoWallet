import * as anchor from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import {transferTokenNoSignature} from './solana/transfer';
import {accessAddress} from './wallet/solana_wallet';
import {
  ISSUER_LOCAL,
  MINT_PUB,
  PRIVATE_KEY,
  USER_1_AUTH,
  USER_KEY,
  USER_WRAPPED_ACC,
  WRAPPER,
} from '../tmp';

export async function airdropToken(
  to: anchor.web3.PublicKey,
  program: anchor.Program<HandmadeNaive>,
) {
  const secretKey = new Uint8Array(PRIVATE_KEY);
  const issuerKey = new Uint8Array(ISSUER_LOCAL);
  const payer = anchor.web3.Keypair.fromSecretKey(secretKey);
  const issuer = anchor.web3.Keypair.fromSecretKey(issuerKey);
  const wrapper = new anchor.web3.PublicKey(WRAPPER);
  const mint = new anchor.web3.PublicKey(MINT_PUB);

  const user1Key = new Uint8Array(USER_KEY);
  const user1WrappedAccount = new anchor.web3.PublicKey(USER_WRAPPED_ACC);
  const user1 = anchor.web3.Keypair.fromSecretKey(user1Key);

  const toWrappedAccount = await accessAddress(
    'WrappedAccount' + mint.toString(),
  );
  //   const [two_auth, bump] = await anchor.web3.PublicKey.findProgramAddressSync(
  //     [
  //       Buffer.from('two_auth'),
  //       user1WrappedAccount.toBuffer(),
  //       user1.publicKey.toBuffer(),
  //     ],
  //     program.programId,
  //   );
  const two_auth = new anchor.web3.PublicKey(USER_1_AUTH);

  await transferTokenNoSignature(
    1,
    wrapper,
    user1,
    user1WrappedAccount,
    to,
    toWrappedAccount,
    two_auth,
    payer,
    program,
  );
}

export async function airdropSol(
  to: anchor.web3.PublicKey,
  program: anchor.Program<HandmadeNaive>,
) {
  const secretKey = new Uint8Array(PRIVATE_KEY);
  const payer = anchor.web3.Keypair.fromSecretKey(secretKey);
  await sendTransaction(payer, to, anchor.web3.LAMPORTS_PER_SOL, program);
}

async function sendTransaction(
  from: anchor.web3.Keypair,
  to: anchor.web3.PublicKey,
  amount: number,
  program: anchor.Program<HandmadeNaive>,
) {
  const transaction = new anchor.web3.Transaction().add(
    anchor.web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: amount,
    }),
  );

  transaction.feePayer = from.publicKey;
  // Sign transaction, broadcast, and confirm
  const signature = await anchor.web3.sendAndConfirmTransaction(
    program.provider.connection,
    transaction,
    [from],
  );

  console.log(`Transfer to ${to.toBase58()} of ${amount} tx : ${signature}`);
}
