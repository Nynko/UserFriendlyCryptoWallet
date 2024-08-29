import {useEffect, useState} from 'react';
import MainConnected from './MainConnected';
import {OnboardingMain} from './onboarding/OnboardingMain';
import {AccountContext, AccountContextState} from './hooks/contexts/useAccount';
import {useBoolState} from './hooks/useBoolState';
import {useMMKV} from 'react-native-mmkv';
import {AccountDispatchProvider} from './components/context/AccountDispatchProvider';
import {loadDltAccount} from './functions/accounts/mmkv-utils';
import {DLT} from './types/account';
import {BalancesProvider} from './components/context/BalancesProviders/BalancesProvider';

export function Main() {
  const [accounts, setAccounts] = useState<
    AccountContextState | null | undefined
  >(undefined);
  const [reloaded, reload] = useBoolState();
  const mmkv = useMMKV();

  // TODO: Check if mmkv contain data and if not, show onboarding

  useEffect(() => {
    const dltAccount = loadDltAccount(DLT.SOLANA, mmkv);
    const _dltAccounts: AccountContextState | null = dltAccount
      ? {
          dltAccounts: {
            [DLT.SOLANA]: dltAccount,
          },
        }
      : null;
    setAccounts(_dltAccounts);
  }, [reloaded, mmkv]);

  if (accounts === undefined) {
    return <>{/* LOADING */}</>;
  }

  if (accounts === null) {
    return (
      <>
        <OnboardingMain reload={reload} />
      </>
    );
  } else {
    return (
      <AccountContext.Provider value={accounts}>
        <AccountDispatchProvider>
          <BalancesProvider>
            <MainConnected />
          </BalancesProvider>
        </AccountDispatchProvider>
      </AccountContext.Provider>
    );
  }
}
