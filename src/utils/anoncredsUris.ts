import * as anchor from '@coral-xyz/anchor';

export function get_solana_address(uri: string): anchor.web3.PublicKey {
  const delimiters = /[:/]/; // Regular expression to match either ':' or '/'
  let address = uri.split(delimiters).slice(-1)[0]; // Last element
  return new anchor.web3.PublicKey(address);
}
