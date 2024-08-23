import {type FC, type ReactNode} from 'react';
import {
  AddressesContext,
  AddressesContextState,
} from '../../hooks/contexts/useAddresses';

export const SolanaAddresses: FC<{
  children: ReactNode;
  addresses: AddressesContextState;
}> = ({children, addresses}) => {
  return (
    <AddressesContext.Provider value={addresses}>
      {children}
    </AddressesContext.Provider>
  );
};
