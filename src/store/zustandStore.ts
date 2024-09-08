import {create, useStore} from 'zustand';
import {DLT, DltAccount} from '../types/account';
import {EURC_MINT, WRAPPER_PDA} from '../const';
import * as anchor from '@coral-xyz/anchor';
import {PersistStorage, persist} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';
import superjson from 'superjson';
import {NATIVE_MINT} from '../const';
export type PublicKeyString = string;

export interface AppStore {
  dlts: Record<DLT, DltAccount>;
  knownPseudos: Record<PublicKeyString, string>; // PublicKey as key and pseudo as value
  initialized: boolean;
}

const storage = new MMKV();

superjson.registerCustom<anchor.web3.PublicKey, string>(
  {
    isApplicable: (v): v is anchor.web3.PublicKey =>
      anchor.web3.PublicKey.prototype.isPrototypeOf(v),
    serialize: v => v.toJSON(),
    deserialize: v => new anchor.web3.PublicKey(v),
  },
  'PublicKey',
);

const zustandStorage: PersistStorage<AppStore> = {
  setItem: (name, value) => {
    return storage.set(name, superjson.stringify(value));
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ? superjson.parse(value) : null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export const appStore = create<AppStore>()(
  persist(
    (_set, _get) => ({
      initialized: false,
      knownPseudos: {},
      dlts: {
        [DLT.SOLANA]: {
          pseudo: '',
          transactions: [],
          prices: {
            [EURC_MINT]: 1,
            [NATIVE_MINT.toBase58()]: 0,
          },
          generalAddresses: {
            pubKey: anchor.web3.PublicKey.default,
            pseudoAccount: anchor.web3.PublicKey.default,
            idendity: anchor.web3.PublicKey.default,
            recovery: anchor.web3.PublicKey.default,
            twoAuth: anchor.web3.PublicKey.default,
            twoAuthEntity: anchor.web3.PublicKey.default,
          },
          nativeBalance: 0n,
          nativeTokenName: 'SOL',
          wrapperBalances: {
            [WRAPPER_PDA]: {
              [EURC_MINT]: {
                decimals: 0,
                balance: 0n,
              },
              [NATIVE_MINT.toBase58()]: {
                decimals: 0,
                balance: 0n,
              },
            },
          },
          wrappers: {
            [WRAPPER_PDA]: {
              wrapperName: 'Main',
              addresses: {
                wrapper: new anchor.web3.PublicKey(WRAPPER_PDA),
                approver: anchor.web3.PublicKey.default,
              },
              mints: {
                [EURC_MINT]: {
                  name: 'EURC',
                  addresses: {
                    wrappedToken: anchor.web3.PublicKey.default,
                    mintAddress: new anchor.web3.PublicKey(EURC_MINT),
                    mintMetadata: anchor.web3.PublicKey.default,
                  },
                },
                [NATIVE_MINT.toBase58()]: {
                  name: 'SOL',
                  addresses: {
                    wrappedToken: anchor.web3.PublicKey.default,
                    mintAddress: NATIVE_MINT,
                    mintMetadata: anchor.web3.PublicKey.default,
                  },
                },
              },
            },
          },
        },
      },
    }),
    {
      name: 'Store',
      storage: zustandStorage,
    },
  ),
);

export function useAppStore(): AppStore;
export function useAppStore<T>(selector: (state: AppStore) => T): T;
export function useAppStore<T>(selector?: (state: AppStore) => T) {
  return useStore(appStore, selector!);
}
