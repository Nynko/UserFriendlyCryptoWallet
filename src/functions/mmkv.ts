import {MMKV} from 'react-native-mmkv';

export const saveState = (storage: MMKV, key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const loadState = (storage: MMKV, key: string) => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};
