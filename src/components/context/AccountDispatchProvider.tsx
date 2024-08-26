import {type FC, type ReactNode} from 'react';
import {useMMKV} from 'react-native-mmkv';
import {
  AccountContextState,
  AccountDispatchContext,
} from '../../hooks/contexts/useAccount';
import {
  DLT,
  DltAccount,
  MintAddress,
  WrapperAddress,
} from '../../types/account';
import {TypedError} from '../../Errors/TypedError';
import {AccountErrors} from '../../Errors/AccountErrors';
import {saveDltAccount} from '../../functions/accounts/mmkv-utils';

export const AccountDispatchProvider: FC<{
  children: ReactNode;
}> = ({children}) => {
  const mmkv = useMMKV();

  function addDltAccount(
    dlt: DLT,
    dltAccount: DltAccount,
    accounts: AccountContextState,
  ) {
    if (!accounts.dltAccounts[dlt]) {
      saveDltAccount(dlt, dltAccount, mmkv);
      accounts.dltAccounts[dlt] = dltAccount;
    } else {
      throw new TypedError(AccountErrors.DltAccountAlreadyExist);
    }
  }

  function updateDltAccount(
    dltAccount: DltAccount,
    dlt: DLT,
    account: AccountContextState,
  ) {
    if (account.dltAccounts[dlt]) {
      mmkv.set(dlt, JSON.stringify(dltAccount));
      account.dltAccounts[dlt] = dltAccount;
    } else {
      throw new TypedError(AccountErrors.DltAccountDoesNotExist);
    }
  }

  function addWrapperAddress(
    dlt: DLT,
    wrapperAddress: WrapperAddress,
    account: AccountContextState,
  ) {
    if (
      !account.dltAccounts[dlt].wrapperAddresses[
        wrapperAddress.wrapper.toString()
      ]
    ) {
      account.dltAccounts[dlt].wrapperAddresses[
        wrapperAddress.wrapper.toString()
      ] = wrapperAddress;
      updateDltAccount(account.dltAccounts[dlt], dlt, account);
    } else {
      throw new TypedError(AccountErrors.WrapperAddressAlreadyExist);
    }
  }

  function addMint(
    dlt: DLT,
    wrapper: string,
    address: MintAddress,
    account: AccountContextState,
  ) {
    if (!account.dltAccounts[dlt].wrapperAddresses[wrapper]) {
      throw new TypedError(AccountErrors.WrapperAddressDoesNotExist);
    }
    if (
      !account.dltAccounts[dlt].wrapperAddresses[wrapper].mints[
        address.mint.toString()
      ]
    ) {
      account.dltAccounts[dlt].wrapperAddresses[wrapper].mints[
        address.mint.toString()
      ] = address;
      updateDltAccount(account.dltAccounts[dlt], dlt, account);
    } else {
      throw new TypedError(AccountErrors.MintAddressAlreadyExist);
    }
  }

  return (
    <AccountDispatchContext.Provider
      value={{addDltAccount, updateDltAccount, addWrapperAddress, addMint}}>
      {children}
    </AccountDispatchContext.Provider>
  );
};
