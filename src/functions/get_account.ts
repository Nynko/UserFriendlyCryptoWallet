import * as anchor from '@coral-xyz/anchor';

export async function getBalance(
  connection: anchor.web3.Connection,
  wallet: anchor.web3.PublicKey,
): Promise<number> {
  let balance = await connection.getBalance(wallet);
  return balance / anchor.web3.LAMPORTS_PER_SOL;
}

export async function getMinimumRent(
  dataSize: number,
  connection: anchor.web3.Connection,
): Promise<number> {
  return (
    (await connection.getMinimumBalanceForRentExemption(dataSize)) /
    anchor.web3.LAMPORTS_PER_SOL
  );
}
