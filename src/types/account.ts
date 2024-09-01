import * as anchor from '@coral-xyz/anchor';
// DLT= Distributed Ledger Technology
export enum DLT {
  SOLANA = 'solana',
  // ETHEREUM = 'ethereum',
  // POLYGON = 'polygon',
  // CARDANO = 'cardano',
  // MINA = 'mina',
  // RADIX = 'radix',
}

export interface DltAccount {
  pseudo: string;
  generalAddresses: GeneralAddresses;
  nativeBalance: number;
  wrapperBalances: Record<string, WrapperBalances>;
  wrappers: Record<string, Wrappers>;
  transactions: Transaction[];
}

export interface GeneralAddresses {
  pubKey: anchor.web3.PublicKey;
  pseudoAccount: anchor.web3.PublicKey;
  idendity: anchor.web3.PublicKey;
  recovery: anchor.web3.PublicKey;
  twoAuth: anchor.web3.PublicKey;
  twoAuthEntity: anchor.web3.PublicKey;
}

export interface WrappersAddresses {
  wrapper: anchor.web3.PublicKey;
  approver: anchor.web3.PublicKey;
}
export interface Wrappers {
  wrapperName: string;
  addresses: WrappersAddresses;
  mints: Record<string, Mint>;
}

export type WrapperBalances = Record<string, MintBalance>;
export interface MintBalance {
  decimals: number;
  balance: number;
}

export interface MintAddresses {
  wrappedToken: anchor.web3.PublicKey;
  mintAddress: anchor.web3.PublicKey;
  mintMetadata: anchor.web3.PublicKey;
}

export interface Mint {
  name: string;
  addresses: MintAddresses;
}

export interface Transaction {
  txSig: string;
  timestamp: number;
  from: anchor.web3.PublicKey;
  to: anchor.web3.PublicKey;
  amount: number;
  native: boolean;
  wrapper?: anchor.web3.PublicKey;
  mint?: anchor.web3.PublicKey;
  decimals: number;
}
