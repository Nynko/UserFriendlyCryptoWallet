import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HomeBalances} from '../components/Balances/HomeBalances';
import {Receive} from '../components/Receive/Receive';
import {Send} from '../components/Send/Send';
import {styles2} from './Style';
import {useAccount} from '../hooks/contexts/useAccount';
import {Layout} from '../components/utils/Layout';
import {mainStyle} from '../../styles/style';
import {useReloadAllBalances} from '../hooks/useReloadAllBalances';

let counterHome = 0;
/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home() {
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

  const reloadBalances = useReloadAllBalances();

  return (
    <Layout otherRefreshAsync={[reloadBalances]}>
      <View style={mainStyle.container}>
        <HomeBalances />
        {activeComponent === ActiveComponent.Send && (
          <Send reloadBalances={reloadBalances} />
        )}
        {activeComponent === ActiveComponent.Receive && pk && (
          <Receive reloadBalances={reloadBalances} pk={pk} />
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
