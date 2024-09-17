import {useCallback, useEffect, useState} from 'react';
import {Receive} from '../components/Receive/Receive';
import {Send} from '../components/Send/Send';
import {mainStyle} from '../../styles/style';
import {appStore} from '../store/zustandStore';
import {DLT} from '../types/account';
import {
  fetchPrice,
  reloadAllBalancesAndTransactionsSolana,
} from '../store/actions';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {RefreshView} from '../components/utils/RefreshView';
import {Balances} from '../components/Balances/Balances';
import {EURC_MINT, WRAPPER_PDA} from '../const';
import {usePrice} from '../store/selectors';
import {SelectedMint} from '../functions/dlts/SelectedMint';
import {ActiveComponent} from '../types/components/ActiveComponent';
import {HomeMain} from '../components/HomeMain';
import {View} from 'tamagui';

let counterHome = 0;
/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.None,
  );
  const [selectedMint, setSelectedMint] = useState<SelectedMint>({
    dlt: DLT.SOLANA,
    wrapper: WRAPPER_PDA,
    mint: EURC_MINT,
  });

  const priceOfSeletedMint: number = usePrice(
    selectedMint.dlt,
    selectedMint.mint,
  );

  counterHome++;
  console.log('counterHome', counterHome);

  const program = useAnchorProgram().program;
  const reloadBalances = () => reloadAllBalancesAndTransactionsSolana(program);
  const reloadPrice = useCallback(
    () => fetchPrice(selectedMint.dlt, selectedMint.mint),
    [selectedMint.dlt, selectedMint.mint],
  );

  const pk = appStore(state => state.dlts[DLT.SOLANA].generalAddresses.pubKey);
  console.log('pk', pk);

  useEffect(() => {
    reloadPrice();
  }, [reloadPrice]);

  console.log('Rendering Home component');
  return (
    <RefreshView otherRefreshAsync={[reloadBalances, reloadPrice]}>
      <Balances setSelectedMint={setSelectedMint} selectedMint={selectedMint} />
      <View style={mainStyle.flexYcentered}>
        {activeComponent === ActiveComponent.None && (
          <HomeMain
            selectedMint={selectedMint}
            priceOfSeletedMint={priceOfSeletedMint}
            setActiveComponent={setActiveComponent}
          />
        )}

        {activeComponent === ActiveComponent.SendComponent && (
          <Send
            selectedMint={selectedMint}
            setSelectedMint={setSelectedMint}
            setActiveComponent={setActiveComponent}
          />
        )}
        {activeComponent === ActiveComponent.ReceiveComponent && pk && (
          <Receive
            pk={pk}
            selectedMint={selectedMint}
            setActiveComponent={setActiveComponent}
          />
        )}
      </View>
    </RefreshView>
  );
}
