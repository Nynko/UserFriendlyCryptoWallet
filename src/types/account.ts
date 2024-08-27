import * as anchor from '@coral-xyz/anchor';

// String when serialized, PublicKey when deserialized
export interface _WrapperAddress<T extends String | anchor.web3.PublicKey> {
  wrapperName: string;
  wrapper: T;
  wrappedToken: T;
  mints: Record<string, _MintAddress<T>>; // Mint address as key
}

export type WrapperAddress = _WrapperAddress<anchor.web3.PublicKey>;

// String when serialized, PublicKey when deserialized
export interface _MintAddress<T extends String | anchor.web3.PublicKey> {
  mintAddress: T;
  mintMetadata: T;
}

export type MintAddress = _MintAddress<anchor.web3.PublicKey>;

// Addresses linked to an identity and address
// String when serialized, PublicKey when deserialized
export interface GeneralAddresses<T extends String | anchor.web3.PublicKey> {
  pubKey: T;
  pseudo: string;
  pseudoAccount: T;
  idendity: T;
  recovery: T;
  twoAuth: T;
  twoAuthEntity: T;
}

// String when serialized, PublicKey when deserialized
export interface _DltAccount<T extends String | anchor.web3.PublicKey> {
  dltName: DLT;
  generalAddresses: GeneralAddresses<T>;
  wrapperAddresses: Record<string, _WrapperAddress<T>>; // Wrapper address as key
}

export type DltAccount = _DltAccount<anchor.web3.PublicKey>;

// DLT= Distributed Ledger Technology
export enum DLT {
  SOLANA = 'solana',
  // ETHEREUM = 'ethereum',
  // POLYGON = 'polygon',
  // CARDANO = 'cardano',
  // MINA = 'mina',
  // RADIX = 'radix',
}
