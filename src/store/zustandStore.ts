import {create, useStore} from 'zustand';
import {DLT, DltAccount} from '../types/account';
import {EURC_MINT, WRAPPER_PDA} from '../const';
import * as anchor from '@coral-xyz/anchor';
import {PersistStorage, persist} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';
import superjson from 'superjson';

export interface AppStore {
  dlts: Record<DLT, DltAccount>;
  knownPseudos: Record<string, anchor.web3.PublicKey>;
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
    console.log(superjson.stringify(value));

    return storage.set(name, superjson.stringify(value));
  },
  getItem: name => {
    const value = storage.getString(name);
    console.log(value);

    return value ? superjson.parse(value) : null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export const appStore = create<AppStore>()(
  persist(
    (_set, _get) => ({
      knownPseudos: {},
      dlts: {
        [DLT.SOLANA]: {
          pseudo: '',
          transactions: [],
          generalAddresses: {
            pubKey: anchor.web3.PublicKey.default,
            pseudoAccount: anchor.web3.PublicKey.default,
            idendity: anchor.web3.PublicKey.default,
            recovery: anchor.web3.PublicKey.default,
            twoAuth: anchor.web3.PublicKey.default,
            twoAuthEntity: anchor.web3.PublicKey.default,
          },
          nativeBalance: 0,
          wrapperBalances: {
            [WRAPPER_PDA]: {
              [EURC_MINT]: {
                decimals: 0,
                balance: 0,
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
