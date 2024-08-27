import {useAccount} from '../hooks/contexts/useAccount';
import {WrapperBalances} from '../components/Balances/WrapperBalances';
import {mapToViewModel} from '../functions/accounts/mapViewModels';
import {Layout} from '../components/utils/Layout';

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Balances({
  isBalanceReloading,
  reloadBalances,
}: {
  isBalanceReloading: boolean;
  reloadBalances: () => void;
}) {
  const {dltAccounts} = useAccount(); // Remove and have a global state
  const wrapperViewModels = mapToViewModel(Object.values(dltAccounts));

  return (
    <Layout otherRefresh={[reloadBalances]}>
      <WrapperBalances wrapperViewModel={wrapperViewModels.Main} />
    </Layout>
  );
}
