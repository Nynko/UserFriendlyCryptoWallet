import * as anchor from '@coral-xyz/anchor';
import {createContext, useContext} from 'react';

export interface MintContextState {
  mints: Record<string, anchor.web3.PublicKey>;
}

export interface MintInfo {}

export interface AddressesDispatchContext {}

export const AddressesContext = createContext<MintContextState>(
  {} as MintContextState,
);

export function useAddresses(): MintContextState {
  return useContext(AddressesContext);
}
