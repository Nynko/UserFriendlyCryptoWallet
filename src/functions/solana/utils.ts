import * as anchor from '@coral-xyz/anchor';

export function sortSignatures(
  tx1: anchor.web3.ConfirmedSignatureInfo,
  tx2: anchor.web3.ConfirmedSignatureInfo,
) {
  if (tx1.blockTime && tx2.blockTime) {
    return tx1.blockTime - tx2.blockTime;
  } else {
    return tx1.slot - tx2.slot;
  }
}
