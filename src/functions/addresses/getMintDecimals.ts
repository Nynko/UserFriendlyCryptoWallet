import * as anchor from '@coral-xyz/anchor';

// This function will get all the token accounts associated with an owner
export async function getMintDecimals(
  mint: anchor.web3.PublicKey,
  connection: anchor.web3.Connection,
) {
  const accounts = await connection.getAccountInfo(mint);

  const decimals = accounts?.data[44]; // 44 see structure of mint token account
  // COption needs 4 bytes before => https://solana.stackexchange.com/questions/13996/82-bytes-mint-accounts

  return decimals;
}
