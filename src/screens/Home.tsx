import {useCallback, useEffect, useState} from 'react';
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
import {SelectedMint} from '../functions/dlts/SelectedMint';
import {HomeMain} from '../components/HomeMain';
import {View, YStack} from 'tamagui';
import {Dimensions, StyleSheet} from 'react-native';
import {HomeLastTransaction} from '../components/Transactions/Home/HomeLastTransaction';
// import {Home as HomeIcon} from '@tamagui/lucide-icons';

let counterHome = 0;
/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home() {
  const [selectedMint, setSelectedMint] = useState<SelectedMint>({
    dlt: DLT.SOLANA,
    wrapper: WRAPPER_PDA,
    mint: EURC_MINT,
  });

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
        {/* <Balances
          setSelectedMint={setSelectedMint}
          selectedMint={selectedMint}
        /> */}
        <View>
          <HomeMain
            selectedMint={selectedMint}
            setSelectedMint={setSelectedMint}
          />
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
