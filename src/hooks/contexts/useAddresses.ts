import {HandmadeNaive} from '../../Anchor_IDL/handmade_naive';
import * as anchor from '@coral-xyz/anchor';
import {createContext, useContext} from 'react';

export interface AddressesContextState {
  wrappedToken: anchor.web3.PublicKey;
  idendity: anchor.web3.PublicKey;
  twoAuth: anchor.web3.PublicKey;
}

export const AddressesContext = createContext<AddressesContextState>(
  {} as AddressesContextState,
);

export function useAddresses(): AddressesContextState {
  return useContext(AddressesContext);
}

