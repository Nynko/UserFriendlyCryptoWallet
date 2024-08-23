import * as anchor from '@coral-xyz/anchor';
import {createContext, useContext} from 'react';

export interface AddressesContextState {
  pubKey: anchor.web3.PublicKey;
  wrappedToken: anchor.web3.PublicKey;
  idendity: anchor.web3.PublicKey;
  recovery: anchor.web3.PublicKey;
  twoAuth: anchor.web3.PublicKey;
  twoAuthEntity: anchor.web3.PublicKey;
  pseudo: string;
}

export interface AddressesDispatchContext {}

export const AddressesContext = createContext<AddressesContextState>(
  {} as AddressesContextState,
);

export function useAddresses(): AddressesContextState {
  return useContext(AddressesContext);
}
