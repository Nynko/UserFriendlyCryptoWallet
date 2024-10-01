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
import {View, XStack, YStack} from 'tamagui';
import {Dimensions, StyleSheet} from 'react-native';
import {HomeLastTransaction} from '../components/Transactions/Home/HomeLastTransaction';
// import {Home as HomeIcon} from '@tamagui/lucide-icons';

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
      <YStack gap={50 * gapRatio}>
        <Balances
          setSelectedMint={setSelectedMint}
          selectedMint={selectedMint}
        />
        <View>
          {activeComponent === ActiveComponent.None && (
            <HomeMain
              selectedMint={selectedMint}
              setSelectedMint={setSelectedMint}
              priceOfSeletedMint={priceOfSeletedMint}
              setActiveComponent={setActiveComponent}
            />
          )}

          {activeComponent === ActiveComponent.SendComponent && (
            <Send
              selectedMint={selectedMint}
              setSelectedMint={setSelectedMint}
              closingFunction={() => setActiveComponent(ActiveComponent.None)}
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
        <View style={[style.container]}>
          <HomeLastTransaction />
        </View>
      </YStack>
    </RefreshView>
  );
}

const {height} = Dimensions.get('window');
const gapRatio = height * 0.001;
const style = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    top: height * 0.3,
  },
  index0: {
    zIndex: 0,
  },
});
