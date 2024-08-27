import {useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {HomeBalances} from '../components/Balances/HomeBalances';
import {Receive} from '../components/Receive/Receive';
import {Send} from '../components/Send/Send';
import {styles2} from './Style';
import {RefreshView} from '../components/utils/RefreshView';
import {useAccount} from '../hooks/contexts/useAccount';
import {Layout} from '../components/utils/Layout';
import {mainStyle} from '../../styles/style';

let counterHome = 0;
/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home({
  isBalanceReloading,
  reloadBalances,
}: {
  isBalanceReloading: boolean;
  reloadBalances: () => void;
}) {
  enum ActiveComponent {
    Receive,
    Send,
    None,
  }
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.None,
  );

  counterHome++;
  console.log(counterHome);

  const {dltAccounts} = useAccount(); // Remove and have a global state
  const pk = dltAccounts.solana.generalAddresses.pubKey;
  console.log('pk', pk);

  return (
    <Layout otherRefresh={[reloadBalances]}>
      <View style={mainStyle.container}>
        <HomeBalances isBalanceReloading={isBalanceReloading} />
        {activeComponent === ActiveComponent.Send && (
          <Send
            isBalanceReloading={isBalanceReloading}
            reloadBalances={reloadBalances}
          />
        )}
        {activeComponent === ActiveComponent.Receive && pk && (
          <Receive
            isBalanceReloading={isBalanceReloading}
            reloadBalances={reloadBalances}
            pk={pk}
          />
        )}
        <View style={styles2.buttonContainer}>
          {/* <TouchableOpacity style={styles2.button} onPress={async () => transfer(1, user1.publicKey, program).then(reloadBalances)}> */}
          <TouchableOpacity
            style={styles2.button}
            onPress={() => setActiveComponent(ActiveComponent.Send)}>
            <Text style={styles2.buttonText}>Envoyer</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles2.button} onPress={async () => accessAddress('PublicKey').then(async publicKey =>
                airdropToken(publicKey, program),
            ).then(reloadBalances)}> */}
          <TouchableOpacity
            style={styles2.button}
            onPress={() => setActiveComponent(ActiveComponent.Receive)}>
            <Text style={styles2.buttonText}>Recevoir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
