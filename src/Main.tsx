import {useEffect, useState} from 'react';
import MainConnected from './MainConnected';
import {OnboardingMain} from './onboarding/OnboardingMain';
import {AddressesContextState} from './hooks/contexts/useAddresses';
import {SolanaAddresses} from './components/context/SolanaAddresses';
import {getAddresses} from './functions/addresses/getAddresses';
import {TypedError} from './Errors/TypedError';
import {useBoolState} from './hooks/useBoolState';

export function Main() {
  const [addresses, setAddresses] = useState<
    AddressesContextState | Error | undefined
  >(undefined);
  const [reloaded, reload] = useBoolState();

  useEffect(() => {
    getAddresses().then(addr => {
      if (addr instanceof TypedError) {
        setAddresses(addr);
      } else if (addr instanceof Error) {
        const err = new Error(`An unexpected error occurred: ${addr.message}`);
        console.error(err);
        setAddresses(err);
      } else {
        setAddresses(addr);
      }
    });
  }, [reloaded]);

  if (addresses === undefined) {
    return <>{/* LOADING */}</>;
  }

  if (addresses instanceof Error) {
    return (
      <>
        <OnboardingMain reload={reload} />
      </>
    );
  } else {
    return (
      <SolanaAddresses addresses={addresses}>
        <MainConnected reload={reload} />
      </SolanaAddresses>
    );
  }
}
