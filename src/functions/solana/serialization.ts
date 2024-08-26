import {web3} from '@coral-xyz/anchor';

export const serializePublicKey = (publicKey: web3.PublicKey): string => {
  return publicKey.toBase58();
};

export const deserializePublicKey = (
  publicKeyString: string,
): web3.PublicKey => {
  return new web3.PublicKey(publicKeyString);
};
