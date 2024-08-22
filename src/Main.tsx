import {useEffect, useState} from 'react';
import {PublicKey} from '@solana/web3.js';
import MainConnected from './MainConnected';
import {OnboardingMain} from './onboarding/OnboardingMain';
import {
  AddressesContextState,
  useAddresses,
} from './hooks/contexts/useAddresses';
import {SolanaAddresses} from './components/context/SolanaAddresses';
import {getAddresses} from './functions/addresses/getAddresses';
import {TypedError} from './Errors/TypedError';

export function Main() {
  const [addresses, setAddresses] = useState<
    AddressesContextState | Error | undefined
  >(undefined);

  useEffect(() => {
    getAddresses().then(addresses => {
      if (addresses instanceof TypedError) {
        setAddresses(addresses);
      } else if (addresses instanceof Error) {
        const err = new Error(
          `An unexpected error occurred: ${addresses.message}`,
        );
        console.error(err);
        setAddresses(err);
      } else {
        setAddresses(addresses);
      }
    });
  }, []);

  if (addresses === undefined) {
    return <>{/* LOADING */}</>;
  }

  if (addresses instanceof Error) {
    return (
      <>
        <OnboardingMain />
      </>
    );
  } else {
    return (
      <SolanaAddresses addresses={addresses}>
        <MainConnected />
      </SolanaAddresses>
    );
  }
}
