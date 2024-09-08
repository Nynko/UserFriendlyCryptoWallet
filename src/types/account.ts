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
  nativeBalance: bigint;
  nativeTokenName: string;
  wrapperBalances: Record<string, WrapperBalances>;
  wrappers: Record<string, Wrappers>;
  transactions: (Transaction | NativeTransaction)[];
  prices: Record<string, number>; // Mint as key and price as value
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
  balance: bigint;
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

export enum Direction {
  OUTGOING,
  INCOMING,
  SELF_TRANSFER,
}

export enum TransactionType {
  NativeTransaction,
  Transaction,
}

export interface NativeTransaction {
  discriminator: TransactionType.NativeTransaction;
  txSig: string;
  timestamp: number;
  direction: Direction;
  address: anchor.web3.PublicKey;
  amount: number;
  decimals: number;
}

export interface Transaction extends Omit<NativeTransaction, 'discriminator'> {
  discriminator: TransactionType.Transaction;
  wrapper: anchor.web3.PublicKey;
  mint: anchor.web3.PublicKey;
}
