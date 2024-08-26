import {MMKV} from 'react-native-mmkv';
import {_DltAccount, DLT, DltAccount} from '../../types/account';
import {
  deserializePublicKey,
  serializePublicKey,
} from '../solana/serialization';

export const saveState = (key: string, value: any, mmkvStorage: MMKV) => {
  mmkvStorage.set(key, JSON.stringify(value));
};

export const loadState = (key: string, mmkvStorage: MMKV) => {
  const value = mmkvStorage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const saveDltAccount = (
  dltName: DLT,
  dltAccount: DltAccount,
  mmkvStorage: MMKV,
) => {
  const serializedAccount = {
    ...dltAccount,
    generalAddresses: {
      ...dltAccount.generalAddresses,
      pubKey: serializePublicKey(dltAccount.generalAddresses.pubKey),
      idendity: serializePublicKey(dltAccount.generalAddresses.idendity),
      recovery: serializePublicKey(dltAccount.generalAddresses.recovery),
      twoAuth: serializePublicKey(dltAccount.generalAddresses.twoAuth),
      twoAuthEntity: serializePublicKey(
        dltAccount.generalAddresses.twoAuthEntity,
      ),
    },
    wrapperAddresses: Object.fromEntries(
      Object.entries(dltAccount.wrapperAddresses).map(([key, value]) => [
        key,
        {
          ...value,
          wrapper: serializePublicKey(value.wrapper),
          wrappedToken: serializePublicKey(value.wrappedToken),
          mints: Object.fromEntries(
            Object.entries(value.mints).map(([mintKey, mintValue]) => [
              mintKey,
              {
                mint: serializePublicKey(mintValue.mint),
                mintMetadata: serializePublicKey(mintValue.mintMetadata),
              },
            ]),
          ),
        },
      ]),
    ),
  };
  saveState(`${dltName}`, serializedAccount, mmkvStorage);
};

export const loadDltAccount = (
  dltName: DLT,
  mmkvStorage: MMKV,
): DltAccount | null => {
  const serializedAccount: _DltAccount<string> = loadState(
    dltName,
    mmkvStorage,
  );
  if (!serializedAccount) {
    return null;
  }

  return {
    ...serializedAccount,
    generalAddresses: {
      ...serializedAccount.generalAddresses,
      pubKey: deserializePublicKey(serializedAccount.generalAddresses.pubKey),
      idendity: deserializePublicKey(
        serializedAccount.generalAddresses.idendity,
      ),
      recovery: deserializePublicKey(
        serializedAccount.generalAddresses.recovery,
      ),
      twoAuth: deserializePublicKey(serializedAccount.generalAddresses.twoAuth),
      twoAuthEntity: deserializePublicKey(
        serializedAccount.generalAddresses.twoAuthEntity,
      ),
    },
    wrapperAddresses: Object.fromEntries(
      Object.entries(serializedAccount.wrapperAddresses).map(([key, value]) => [
        key,
        {
          ...value,
          wrapper: deserializePublicKey(value.wrapper),
          wrappedToken: deserializePublicKey(value.wrappedToken),
          mints: Object.fromEntries(
            Object.entries(value.mints).map(([mintKey, mintValue]) => [
              mintKey,
              {
                mint: deserializePublicKey(mintValue.mint),
                mintMetadata: deserializePublicKey(mintValue.mintMetadata),
              },
            ]),
          ),
        },
      ]),
    ),
  };
};
