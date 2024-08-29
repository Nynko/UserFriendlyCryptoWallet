import {AccountContextState} from '../../../hooks/contexts/useAccount';
import {BalancesDispatchContextState} from '../../../hooks/contexts/useBalancesDispatch';
import {DLT} from '../../../types/account';

export function updateReloadAll(
  accounts: AccountContextState,
  prev: BalancesDispatchContextState,
): () => Promise<void> {
  return async () => {
    console.log('Reloading all balances');

    for (const dltAccount of Object.keys(accounts.dltAccounts) as DLT[]) {
      const localDltAccount = accounts.dltAccounts[dltAccount];
      prev.dltDispatch[dltAccount].reloadNativeBalance();
      for (const wrapper of Object.values(localDltAccount.wrapperAddresses)) {
        for (const mint of Object.keys(wrapper.mints)) {
          prev.dltDispatch[dltAccount].wrappers[wrapper.wrapper.toBase58()][
            mint
          ].reloadBalance();
        }
      }
    }
  };
}
