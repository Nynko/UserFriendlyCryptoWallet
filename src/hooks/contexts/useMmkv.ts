import {createContext, useContext} from 'react';
import {MMKV} from 'react-native-mmkv';

export interface MmkvContextState {
  storage: MMKV;
}

export const MmkvContext = createContext<MmkvContextState>(
  {} as MmkvContextState,
);

export function useMMKV(): MmkvContextState {
  return useContext(MmkvContext);
}
