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
      pseudoAccount: serializePublicKey(
        dltAccount.generalAddresses.pseudoAccount,
      ),
    },
    wrapperAddresses: Object.fromEntries(
      Object.entries(dltAccount.wrapperAddresses).map(([key, value]) => [
        key,
        {
          ...value,
          wrapper: serializePublicKey(value.wrapper),
          wrappedToken: serializePublicKey(value.wrappedToken),
          approver: serializePublicKey(value.approver),
          mints: Object.fromEntries(
            Object.entries(value.mints).map(([mintKey, mintValue]) => [
              mintKey,
              {
                mintAddress: serializePublicKey(mintValue.mintAddress),
                mintMetadata: serializePublicKey(mintValue.mintMetadata),
                decimals: mintValue.decimals,
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
      pseudoAccount: deserializePublicKey(
        serializedAccount.generalAddresses.pseudoAccount,
      ),
    },
    wrapperAddresses: Object.fromEntries(
      Object.entries(serializedAccount.wrapperAddresses).map(([key, value]) => [
        key,
        {
          ...value,
          wrapper: deserializePublicKey(value.wrapper),
          wrappedToken: deserializePublicKey(value.wrappedToken),
          approver: deserializePublicKey(value.approver),
          mints: Object.fromEntries(
            Object.entries(value.mints).map(([mintKey, mintValue]) => [
              mintKey,
              {
                mintAddress: deserializePublicKey(mintValue.mintAddress),
                mintMetadata: deserializePublicKey(mintValue.mintMetadata),
                decimals: mintValue.decimals,
              },
            ]),
          ),
        },
      ]),
    ),
  };
};
