import {WrapperBalances} from '../components/Balances/WrapperBalances';
import {mapToViewModel} from '../functions/accounts/mapViewModels';
import {Layout} from '../components/utils/Layout';
import {useDltAccounts} from '../store/selectors';
import {reloadAllBalancesSolana} from '../store/actions';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Balances() {
  const dltAccounts = useDltAccounts();
  const wrapperViewModels = mapToViewModel(dltAccounts);
  const program = useAnchorProgram().program;
  const reloadAllBalances = () => reloadAllBalancesSolana(program);

  return (
    <Layout otherRefreshAsync={[reloadAllBalances]}>
      {Object.keys(wrapperViewModels).map(wrapperAddress => (
        <WrapperBalances
          wrapperViewModel={wrapperViewModels[wrapperAddress]}
          wrapperAddress={wrapperAddress}
        />
      ))}
    </Layout>
  );
}
