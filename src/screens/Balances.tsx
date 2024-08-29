import {useAccount} from '../hooks/contexts/useAccount';
import {WrapperBalances} from '../components/Balances/WrapperBalances';
import {mapToViewModel} from '../functions/accounts/mapViewModels';
import {Layout} from '../components/utils/Layout';
import {useBalances} from '../hooks/contexts/useBalances';
import {DLT} from '../types/account';
import {Button} from 'react-native';
import {useMMKV} from 'react-native-mmkv';

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Balances() {
  const {dltAccounts} = useAccount(); // Remove and have a global state
  const wrapperViewModels = mapToViewModel(Object.values(dltAccounts));
  const sol_balances = useBalances(DLT.SOLANA);
  const mmkv = useMMKV();
  console.log('sol_balances', sol_balances);

  const reloadAllBalances = () => {
    for (const dltViewAccount of wrapperViewModels.Main.dltAccounts) {
      sol_balances.wrappers[
        dltViewAccount.wrapperAddress.wrapper.toBase58()
      ].EURC.reloadBalance();
      console.log('reloading balances');
      console.log(sol_balances);
    }
    /** TODO */
  };

  return (
    <Layout otherRefresh={[reloadAllBalances]}>
      <WrapperBalances wrapperViewModel={wrapperViewModels.Main} />
      <Button
        title="Delete Account"
        onPress={() => {
          mmkv.delete(DLT.SOLANA);
        }}
      />
    </Layout>
  );
}
